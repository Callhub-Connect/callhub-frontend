import styled from 'styled-components';


export const FileManagerContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const PdfContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const PdfViewer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
`;

export const PdfIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  margin-bottom: 10px;
`;

export const PdfNavbar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: black;
`;

export const Button = styled.button`
    width: 25%;
    font-family: 'League Spartan', sans-serif;
    background-color: #0b9f43;
    border-width: 0;
    border-radius: 30px;
    font-size: x-large;
    color: white;
    cursor: pointer;
`;