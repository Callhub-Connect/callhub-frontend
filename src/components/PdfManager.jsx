import React, { useState, useMemo } from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import PdfJSComponent from './PdfJSComponent';


const FileManagerContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const PdfContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const PdfViewer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
`;

const PdfIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  margin-bottom: 10px;
`;

function PdfFileManager() {
  const [uploadedPdfs, setUploadedPdfs] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);

  const openPdf = (pdf) => {
    setSelectedPdf(pdf);
  };

  const closePdf = () => {
    setSelectedPdf(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUploadedPdfs([...uploadedPdfs, file]);
    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append("file", file);

    // Send the file to the backend
    // Axios.post('http://localhost:8080/files/upload_network', formData)
    //   .then((response) => {
    //     // File uploaded successfully
    //     console.log('File uploaded successfully:', response.data);
    //   })
    //   .catch((error) => {
    //     // Handle any errors (e.g., show an error message)
    //     console.error('File upload failed:', error);
    //   });
  };

  // Memoized iframe element
  const pdfViewer = useMemo(() => {
    if (selectedPdf) {
      return (
        <PdfJSComponent
				document="http://localhost:8080/files/65487f2806b6975c352f86a8"
			/>
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
