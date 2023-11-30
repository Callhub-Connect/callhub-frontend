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