import React, { useState, useMemo, useRef } from 'react';
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

function PdfFileManager() {
  const [uploadedPdfs, setUploadedPdfs] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState('');
  const fileInputRef = useRef(null);
  const [pdfViewerInstance, setPdfViewerInstance] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const openPdf = (event) => {
    const selectedPdfId = event.target.value;
    const pdf = uploadedPdfs.find(pdf => pdf.id === selectedPdfId);
    setSelectedPdf(pdf);
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
    Axios.post('http://localhost:8080/files/session_add_pdf', formData)
      .then((response) => {
        // File uploaded successfully
        console.log('File uploaded successfully:', response.data);
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
      })
      .catch((error) => {
        // Handle any errors (e.g., show an error message)
        console.error('File upload failed:', error);
      });
  };

  // Memoized iframe element
  const pdfViewer = useMemo(() => {
    if (selectedPdf) {
        return (
          <PdfViewerComponent
            document={`http://localhost:8080/files/${selectedPdf.id}`}
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
        console.log(blob); // Check what is being returned here
        if (!blob) {
          console.error('No data returned from exportPdf');
          return;
        }

        const formData = new FormData();
        formData.append("file", blob, `updated_${selectedPdf.name}`); // Ensure blob is a Blob object
  
        Axios.put(`http://localhost:8080/files/update/${selectedPdf.id}`, formData)
        .then(response => {
          // Handle success
          console.log('PDF updated successfully:', response.data);
          setAlertOpen(true);
          setTimeout(() => setAlertOpen(false), 2000); // Close the alert after 2 seconds
        })
        .catch(error => {
          // Handle error
          console.error('PDF update failed:', error);
        });
      });
    }
  };  

  return (
    <FileManagerContainer>
      <Snackbar 
        open={alertOpen} 
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
          <Alert severity="success" sx={{ fontSize: '1.5rem' }}>
            PDF changes saved successfully
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
        <Button onClick={handleButtonClick}>Upload PDF</Button>
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