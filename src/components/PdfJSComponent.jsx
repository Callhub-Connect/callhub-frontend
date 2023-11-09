import React, { useState, useRef } from 'react'
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import "react-pdf/dist/esm/Page/TextLayer.css";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

export default function PdfJSComponent({currentFile}) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const canvasRef = useRef([]);

  const drawDot = (event, pageIndex) => {
    const canvas = canvasRef.current[pageIndex];
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Draw a dot
    ctx.fillStyle = 'black'; // Dot color
    ctx.beginPath();
    ctx.arc(x, y, 2.5, 0, Math.PI * 2); // 5px diameter dot
    ctx.fill();
  };

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  

  return (
    <>
      <Document
        file={currentFile}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page 
          pageNumber={pageNumber} 
          renderAnnotationLayer={false} // Disable default annotation layer if you want to draw yourself
          renderTextLayer={false} // Disable text layer if not needed
          canvasRef={(el) => {
            canvasRef.current[pageNumber] = el;
          }}
          onClick={(event) => drawDot(event, pageNumber)}
        />
      </Document>
      <div>
        <p>
          Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
        </p>
        <button
          type="button"
          disabled={pageNumber <= 1}
          onClick={previousPage}
        >
          Previous
        </button>
        <button
          type="button"
          disabled={pageNumber >= numPages}
          onClick={nextPage}
        >
          Next
        </button>
      </div>
    </>
  );
}
