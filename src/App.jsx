import React from 'react';
import Welcome from './components/welcome-component/Welcome';
import GenerateSession from './components/generate-session-component/GenerateSession';
import EnterCode from './components/enter-code-component/EnterCode';
import Chat from './components/chat-component/Chat';
import EndSession from './components/end-session-component/EndSession';
import StartSession from './components/start-session-component/StartSession';


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
                    path="/end"
                    element={<EndSession />}
                />
                <Route
                    path="*"
                    element={<Navigate to="/" />}
                />
                <Route
                    path="/start-session"
                    element={<StartSession/>}
                />
            </Routes>
        </Router>
    </>
  );
}

export default App;
