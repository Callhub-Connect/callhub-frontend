import React from 'react';
import EnterCode from './components/EnterCode';
import EndSession from './components/EndSession';
import StartSessionButton from './components/StartSessionButton';
import Chat from './components/Chat';
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
                    element={<EnterCode />}
                />
                <Route
                    path="/session"
                    element={<Chat />}
                />
                <Route
                    path="/end"
                    element={<EndSession />}
                />
                <Route
                    path="*"
                    element={<Navigate to="/" />}
                />
                <Route
                    path="/start-session"
                    element={<StartSessionButton/>}
                />
            </Routes>
        </Router>
    </>
  );
}

export default App;
