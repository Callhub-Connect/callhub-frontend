import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import Axios from 'axios';
import PdfViewerComponent from './PdfViewerComponent.jsx';
import DocumentFile from '../../classes/Document.js';
import {
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Alert,
  Snackbar,
} from "@mui/material";
import { 
  FileManagerContainer,
  PdfContainer,
  PdfNavbar,
  Button,
} from './PdfManager-styles';
import { sendDocumentIdWebsocket, subscribeToFiles, unsubscribeFromFiles } from '../../websocket';

function PdfFileManager() {
  const [uploadedPdfs, setUploadedPdfs] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState('');
  const fileInputRef = useRef(null);
  const [pdfViewerInstance, setPdfViewerInstance] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success'); // 'success' or 'error'

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const openPdf = useCallback((event) => {
    const selectedPdfId = event.target.value;
  
    // Check if the selected PDF is already open
    if (selectedPdf && selectedPdf.id === selectedPdfId) {
      // Reset the selected PDF to force a refresh
      setSelectedPdf(null);
  
      // Use a timeout to ensure the state is cleared before setting it again
      setTimeout(() => {
        const pdf = uploadedPdfs.find(pdf => pdf.id === selectedPdfId);
        setSelectedPdf(pdf);
      }, 0);
    } else {
      const pdf = uploadedPdfs.find(pdf => pdf.id === selectedPdfId);
      setSelectedPdf(pdf);
    }
  }, [uploadedPdfs, selectedPdf]);

  const fetchPdfById = async (pdfId) => {
    try {
      const response = await Axios.get(`https://connect.greenplant-1b2a73a7.eastus.azurecontainerapps.io/files/${pdfId}`, {
        responseType: 'blob' // Expect a binary response
      });
      console.log(response);
      const newName =  await Axios.get(`https://connect.greenplant-1b2a73a7.eastus.azurecontainerapps.io/files/name/${pdfId}`);
      const pdfBlobUrl = URL.createObjectURL(response.data); // Create a URL from the Blob
      return new DocumentFile({
        id: pdfId,
        name: newName.data, // Set an appropriate name
        content: pdfBlobUrl // URL to be used by the PDF viewer
      });
    } catch (error) {
      console.error("Error fetching file:", error);
    }
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", file.name);
    let sessionCode = sessionStorage.getItem("sessionCode");
    console.log(sessionCode)
    formData.append("session", sessionCode); 

    // Send the file to the backend
    Axios.post('https://connect.greenplant-1b2a73a7.eastus.azurecontainerapps.io/files/session_add_pdf', formData)
      .then((response) => {
        // File uploaded successfully
        console.log('File uploaded successfully:', response.data);
        sendDocumentIdWebsocket(response.data);
        let documentItem = new DocumentFile(
          {
            id: response.data,
            name: file.name,
            content: file
          }
        )
        // Update to prevent duplicate files
        if (!uploadedPdfs.some(pdf => pdf.id === response.data)) {
          setUploadedPdfs([...uploadedPdfs, documentItem]);
        }
        setAlertSeverity('success');
        setAlertMessage('File uploaded successfully');
        setAlertOpen(true);
        setTimeout(() => setAlertOpen(false), 2000); // Close the alert after 2 seconds
      })
      .catch((error) => {
        // Handle any errors (e.g., show an error message)
        console.error('File upload failed:', error);
        setAlertMessage('Error uploading file');
        setAlertSeverity('error');
        setAlertOpen(true);
        setTimeout(() => setAlertOpen(false), 2000); // Close the alert after 2 seconds
      });
  };

  // Memoized iframe element
  const pdfViewer = useMemo(() => {
    if (selectedPdf) {
        return (
          <PdfViewerComponent
            document={`https://connect.greenplant-1b2a73a7.eastus.azurecontainerapps.io/files/${selectedPdf.id}`}
            onInstanceChange={instance => setPdfViewerInstance(instance)}
          />
        );
      } else {
        return null;
      }
  }, [selectedPdf]);

  const handleSave = () => {
    if (pdfViewerInstance && selectedPdf) {
      pdfViewerInstance.exportPdf().then((blob) => {
        if (!blob) {
          console.error('No data returned from exportPdf');
          return;
        }
        const formData = new FormData();
        formData.append("file", blob, `updated_${selectedPdf.name}`);
  
        Axios.put(`https://connect.greenplant-1b2a73a7.eastus.azurecontainerapps.io/files/update/${selectedPdf.id}`, formData)
        .then(response => {
          console.log('File updated successfully:', response.data);
          setAlertMessage("File changes saved successfully");
          setAlertSeverity('success');
          setAlertOpen(true);
          setTimeout(() => setAlertOpen(false), 2000);
  
          // Send the updated document ID via WebSocket
          sendDocumentIdWebsocket(selectedPdf.id); // Example function to send data via WebSocket
        })
        .catch(error => {
          console.error('File update failed:', error);
          setAlertMessage("Error saving file changes");
          setAlertSeverity('error');
          setAlertOpen(true);
          setTimeout(() => setAlertOpen(false), 2000);
        });
      });
    }
  };  

  useEffect(() => {
    const handleDocumentUpdate = async (documentId) => {
      const newDocument = await fetchPdfById(documentId);
      if (newDocument) {
        setUploadedPdfs(prevPdfs => {
          const isExisting = prevPdfs.some(pdf => pdf.id === newDocument.id);
          if (isExisting) {
            // Replace the existing entry with the updated one
            return prevPdfs.map(pdf => pdf.id === newDocument.id ? newDocument : pdf);
          } else {
            return [...prevPdfs, newDocument];
          }
        });
    
        if (newDocument.id === selectedPdf?.id) {
          setSelectedPdf(newDocument);
          // Create a mock event object
          const mockEvent = { target: { value: newDocument.id } };
          openPdf(mockEvent);
        }
      }
    };

    subscribeToFiles(handleDocumentUpdate);

    return () => {
      unsubscribeFromFiles(handleDocumentUpdate);
      // Cleanup Blob URLs if necessary
      uploadedPdfs.forEach(pdf => URL.revokeObjectURL(pdf.content));
    };
  }, [uploadedPdfs, selectedPdf, openPdf]);

  return (
    <FileManagerContainer>
      <Snackbar
        open={alertOpen}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          severity={alertSeverity} 
          sx={{ fontSize: '1.5rem' }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
      <PdfNavbar>
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          id="fileInput"
          style={{ display: 'none' }} // Hide the actual file input
          ref={fileInputRef}
        />
        <Button onClick={handleButtonClick}>Upload</Button>
        <Button onClick={handleSave}>Save Changes</Button>
        <FormControl sx={{ width: "40%" }}>
        <InputLabel
          id="pdf-select-label"
          sx={{
            color: 'white', // Change label color to white
            fontSize: '1.75rem', // Increase the font size of the label
          }}
        >
          Select
        </InputLabel>
        <Select
          labelId="pdf-select-label"
          id="pdf-select"
          value={selectedPdf ? selectedPdf.id : ''}
          label="Select PDF"
          onChange={openPdf}
          sx={{
            height: '50px',
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: 'white',
              },
              "&:hover fieldset": {
                borderColor: 'white',
              },
              "&.Mui-focused fieldset": {
                borderColor: 'white',
              },
              // Adjust the padding to vertically center the text
              paddingTop: '6px', 
              paddingBottom: '6px',
            },
            "& .MuiInputLabel-root": { 
              color: 'white',
              fontSize: '1.75rem', // Increase the font size of the input label
            },
            "& .MuiFormHelperText-root": { 
              color: 'white',
            },
            "& .MuiSelect-icon": { 
              color: 'white',
            },
            "& .MuiSelect-select": { 
              color: 'white',
              fontSize: '1.75rem', // Increase the font size of the select text
              lineHeight: '1.43', // Adjust line height to center the text
            },
          }}
        >
          {uploadedPdfs.map((pdf) => (
            <MenuItem 
              key={pdf.id} 
              value={pdf.id}
              sx={{ fontSize: '1.75rem' }} // Increase the font size of menu items
            >
              {pdf.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      </PdfNavbar>
      <PdfContainer>
        {pdfViewer}
      </PdfContainer>
    </FileManagerContainer>
  );
}

export default PdfFileManager;