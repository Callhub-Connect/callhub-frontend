import React from 'react';
import EnterCode from './components/EnterCode';
import EndSession from './components/EndSession';
import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'League Spartan', sans-serif;
  }`

function App() {
  return (
    <div>
      <GlobalStyle />
      <EnterCode />
    </div>
  );
}

export default App;
