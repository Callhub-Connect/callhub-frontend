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
    const sessionId = sessionStorage.getItem("sessionId");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [open, setOpen] = useState(true);

    useEffect(() => emailjs.init("OScF2lHq5ESl_o9lU"), []);
    const sendEmail = async (e) => {
        e.preventDefault();
        const serviceId = "service_2ndgu8t";
        const templateId = "template_feo851p";

        // TODO: change to azure endpoint
        let transcriptUrl = 'http://localhost:8080/email/transcript/' + sessionId
        let dateUrl = 'http://localhost:8080/email/date/' + sessionId

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
            setTimeout(() => setSuccess(false), 2000);
        } catch (error) {
            // alert("Oops! Something went wrong while trying to send the email. Please make sure there are messages in the conversation before sending.");
            console.error('Error fetching transcript or sending email:', error.message);
            setError(true);
            setTimeout(() => setError(false), 2000);
        }
    };

    useEffect(() => {
        // Set a timer to hide the Snackbar after 2 seconds
        const timer = setTimeout(() => {
            setOpen(false);
        }, 2000);

        // Cleanup the timer when the component is unmounted
        return () => {
            clearTimeout(timer);
        };
    }, []);

    return(
        <Container>
            <Snackbar
            open={open}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert 
                    severity="info"
                    sx={{ fontSize: '1.5rem' }}
                >
                    Session has been ended
                </Alert>
            </Snackbar>
            <Logo src="./img/callhubLogo-cropped.svg" alt="Callhub Logo" />
            <CodeContainer>
                <Text>Your session has now ended.</Text>
                <InputSection>
                    <Input placeholder="Email Address" ref={emailRef} />
                    <Button onClick={sendEmail}>Get Email Transcript</Button>
                </InputSection>
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