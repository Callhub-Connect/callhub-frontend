import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { connectWebsocket } from "../../websocket";
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

    // this is just for demo purposes, we're going to need to integrate this with specific session
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
                alert('Invalid code');
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
                    <Input placeholder="ex. abcd123" 
                        onKeyPress={handleKeyPress} onChange={handleInputChange}/>
                    <Button onClick={joinSession}>Connect</Button>
                </InputSection>
            </CodeContainer>
        </Container>
    );
}

export default EnterCode;
