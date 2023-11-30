import React, {useRef, useEffect, useState} from "react";
import emailjs from '@emailjs/browser';
import axios from 'axios';
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
} from "./EndSession-styles";

function EndSession() {
    const emailRef = useRef();
    const sessionCode = sessionStorage.getItem("sessionCode");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => emailjs.init("OScF2lHq5ESl_o9lU"), []);
    const sendEmail = async (e) => {
        e.preventDefault();
        const serviceId = "service_2ndgu8t";
        const templateId = "template_feo851p";

        // TODO: change to azure endpoint
        let transcriptUrl = 'http://localhost:8080/email/transcript/' + sessionCode
        let dateUrl = 'http://localhost:8080/email/date/' + sessionCode

        try {
            const response = await axios.get(transcriptUrl);
            console.log(response);

            if (!response || !response.data) {
                throw new Error('Invalid response from the server');
            }

            const transcript = response.data;
            console.log('Transcript:', transcript);

            const dateResponse = await axios.get(dateUrl);
            const date = dateResponse.data;

            await emailjs.send(serviceId, templateId, {
                recipient: emailRef.current.value,
                message: transcript,
                date: date
            });
            // Clear the input after the email is successfully sent
            emailRef.current.value = "";
            // alert("Email successfully sent. Check inbox.");
            setSuccess(true);
            setTimeout(() => setSuccess(false), 5000);
        } catch (error) {
            // alert("Oops! Something went wrong while trying to send the email. Please make sure there are messages in the conversation before sending.");
            console.error('Error fetching transcript or sending email:', error.message);
            setError(true);
            setTimeout(() => setError(false), 5000);
        }
    };
    return(
        <Container>
            <Logo src="./img/callhubLogo-cropped.svg" alt="Callhub Logo" />
            <CodeContainer>
                <Text>Your session has now ended.</Text>
                <InputSection>
                    <Input placeholder="Email Address" />
                    <Button>Get Email Transcript</Button>
                </InputSection>
                {/* <Button>Get Email Transcript</Button> */}
            </CodeContainer>
            <Snackbar
                open={success}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert severity="success" sx={{ fontSize: '1.5rem' }}>
                    Email successfully sent. Check inbox.
                </Alert>
            </Snackbar>
            <Snackbar
                open={error}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert severity="error" sx={{ fontSize: '1.5rem' }}>
                    Oops! Something went wrong while trying to send the email. Please make sure there are messages in the conversation before sending.
                </Alert>
            </Snackbar>
        </Container>
    );
}

export default EndSession;