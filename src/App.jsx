import React from 'react';
import EnterCode from './components/EnterCode';
import EndSession from './components/EndSession';
import GenerateSession from './components/GenerateSession';
import Welcome from './components/Welcome';
import Chat from './components/Chat';
import PdfFileManager from './components/PdfManager';
import { createGlobalStyle } from 'styled-components';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

const GlobalStyle = createGlobalStyle`
    body {
        font-family: 'League Spartan', sans-serif;
    }`

function App() {
  return (
    <>
        <GlobalStyle />
        <Router>
            <Routes>
                <Route
                    exact
                    path="/"
                    element={<Welcome />}
                />
                <Route
                    exact
                    path="/generate"
                    element={<GenerateSession />}
                />
                <Route
                    exact
                    path="/enter"
                    element={<EnterCode />}
                />
                <Route
                    path="/session"
                    element={<Chat />}
                />
                <Route
                    path="/pdf"
                    element={<PdfFileManager />}
                />
                <Route
                    path="/end"
                    element={<EndSession />}
                />
                <Route
                    path="*"
                    element={<Navigate to="/" />}
                />
            </Routes>
        </Router>
    </>
  );
}

export default App;
