import React from 'react';
import EnterCode from './components/EnterCode';
import EndSession from './components/EndSession';
import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'League Spartan', sans-serif;
  }`

const Container = styled.div`
  background-image: linear-gradient(to bottom right, #0a8e3d, #9fdb3f);
  background-size: contain;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

function App() {
  return (
    <Container>
      <GlobalStyle />
      <EnterCode />
    </Container>
  );
}

export default App;
