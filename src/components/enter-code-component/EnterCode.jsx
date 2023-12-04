import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { connectWebsocket } from "../../websocket";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { 
    Container,
    Logo,
    CodeContainer,
    Text,
    InputSection,
    Input,
    Button,
} from "./EnterCode-styles";

function EnterCode() {
    let navigate = useNavigate();
    const [sessionInput, setSessionInput] = useState("");
    const [alertOpen, setAlertOpen] = useState(false);

    const joinSession = () => {
        let joinUrl = "http://localhost:8080/session/join/" + sessionInput;

        axios.get(joinUrl)
            .then(function (response) {
                console.log(response);
                let sessionCode = response.data.sessionCode;
                sessionStorage.setItem('sessionCode', sessionCode);
                let sessionId = response.data.sessionId;
                sessionStorage.setItem('sessionId', sessionId);
                console.log(sessionCode);
                connectWebsocket('customer', sessionId);
                localStorage.setItem('isSessionActive', 'true');
                let path = `/session`; 
                navigate(path);
            })
            .catch(error => {
                console.log('error', error);
                setAlertOpen(true);
                setTimeout(() => setAlertOpen(false), 2000); // Close the alert after 2 seconds
            });
    }

    const handleInputChange = (e) => {
        setSessionInput(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
          joinSession();
        }
    };

    return (
        <Container>
            <Logo src="./img/callhubLogo-cropped.svg" alt="Callhub Logo" />
            <CodeContainer>
                <Text>Enter your session code</Text>
                <InputSection>
                    <Input placeholder="ex. ABCDEF" 
                        onKeyPress={handleKeyPress} onChange={handleInputChange}/>
                    <Button onClick={joinSession}>Connect</Button>
                </InputSection>
            </CodeContainer>
            <Snackbar 
                open={alertOpen} 
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert severity="error" sx={{ fontSize: '1.5rem' }}>
                    Invalid Code
                </Alert>
            </Snackbar>
        </Container>
    );
}

export default EnterCode;
