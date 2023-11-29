import React, { useState, useMemo } from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import PdfViewerComponent from './PdfViewerComponent.jsx';
import DocumentFile from '../../classes/Document.js';

import { 
  FileManagerContainer,
  PdfContainer,
} from './PdfManager-styles';


function PdfFileManager() {
  const [uploadedPdfs, setUploadedPdfs] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);

  const openPdf = (pdf) => {
    setSelectedPdf(pdf);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUploadedPdfs([...uploadedPdfs, file]);
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
        setUploadedPdfs([...uploadedPdfs, documentItem]);
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
            <PdfViewerComponent document={`http://localhost:8080/files/${selectedPdf.id}`}/>
        );
      } else {
        return null;
      }
  }, [selectedPdf]);

  return (
    <FileManagerContainer>
      <h2>Upload a PDF</h2>

      {/* Upload PDF Button */}
      <input type="file" accept=".pdf" onChange={handleFileChange} id="fileInput" />

      <PdfContainer>
        {/* Display Uploaded PDFs */}
        <div className="uploaded-pdfs">
          <h2>Uploaded PDFs</h2>
          <ul>
            {uploadedPdfs.map((pdf, index) => (
              <li style={{cursor: "pointer"}} key={index} onClick={() => openPdf(pdf)}>
                {pdf.name}
              </li>
            ))}
          </ul>
        </div>

        {/* View Selected PDF */}
        {pdfViewer}
      </PdfContainer>
    </FileManagerContainer>
  );
}

export default PdfFileManager;
