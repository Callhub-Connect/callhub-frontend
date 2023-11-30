import React, {useRef, useEffect } from "react";
import emailjs from '@emailjs/browser';
import axios from 'axios';

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

    useEffect(() => emailjs.init("OScF2lHq5ESl_o9lU"), []);
    const sendEmail = async (e) => {
        e.preventDefault();
        const serviceId = "service_2ndgu8t";
        const templateId = "template_feo851p";

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
            alert("Email successfully sent. Check inbox.");
        } catch (error) {
            alert("Oops! Something went wrong while trying to send the email. Please make sure there are messages in the conversation before sending.");
            console.error('Error fetching transcript or sending email:', error.message);
        }
    };
    return(
        <Container>
            <Logo src="./img/callhubLogo-cropped.svg" alt="Callhub Logo" />
            <CodeContainer>
                <Text>Your session has now ended.</Text>
                <InputSection>
                    <Input placeholder="Email Address" ref={emailRef} />
                    <Button onClick={sendEmail}>Get Email Transcript</Button>
                </InputSection>
            </CodeContainer>
        </Container>
    );
}

export default EndSession;