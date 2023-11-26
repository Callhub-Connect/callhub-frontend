import React, {useRef, useEffect } from "react";
import styled from 'styled-components';
import emailjs from '@emailjs/browser';
import axios from 'axios';

const Container = styled.div`
    background-image: linear-gradient(to bottom right, #0a8e3d, #9fdb3f);
    background-size: contain;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
`;

const Logo = styled.img`
    height: 270px;
    width: 550px;
`;

const CodeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    padding: 30px 0px 30px 30px;
    height: 200px;
    width: 850px;
    background-color: #f8f8f8b2;
    border-radius: 50px;
    box-shadow: 0px 4px 10px #00000040;
`;

const Text = styled.h3`
    height: 25px;
    width: 724px;
    color: #000000;
    font-size: 40px;
    font-weight: 400;
    line-height: normal;
    text-align: center;
    position: relative;
    margin-bottom: 30px;
`;

const InputSection = styled.div`
    height: 70px;
    width: 724px;
    display: flex;
    flex-direction: row;

    @media (max-width: 768px) {
        /* Add styles for smaller screens here */
        /* For example, reduce the width or change the flex-direction */
        width: 90%;
        flex-direction: column;
        align-items: center;
        gap: 16px;
    }
`;

const Input = styled.input`
    border-radius: 30px 0px 0px 30px;
    border: 0px solid;
    width: 80%;
    height: 50px;
    padding: 8px 24px;
    line-height: 20px;
    font-size: x-large;
    font-family: 'League Spartan', sans-serif;
    ::placeholder {
        color: #5e5e5ec4;
        font-size: 18px;
    }
`;

const Button = styled.button`
    height: 50px;
    width: 50%;
    font-family: 'League Spartan', sans-serif;
    background-color: #0b9f43;
    border-radius: 0px 30px 30px 0px;
    position: relative;
    color: white;
    font-size: x-large;
    border: 0px solid;
    cursor: pointer;
    &:hover {
        background-color: #076a2d;
    }
`;

function EndSession() {
    const emailRef = useRef();
    const sessionCode = sessionStorage.getItem("sessionCode");

    useEffect(() => emailjs.init("OScF2lHq5ESl_o9lU"), []);
    const sendEmail = async (e) => {
        e.preventDefault();
        const serviceId = "service_2ndgu8t";
        const templateId = "template_feo851p";

        let transcriptUrl = 'http://localhost:8080/session/transcript/' + sessionCode

        try {
            const response = await axios.get(transcriptUrl);
            console.log(response);
            
            if (!response || !response.data) {
                    throw new Error('Invalid response from the server');
                  }

            const transcript = response.data;
            console.log('Transcript:', transcript);

            await emailjs.send(serviceId, templateId, {
                recipient: emailRef.current.value,
                message: transcript
            });
            alert("Email successfully sent. Check inbox.");
        } catch (error) {
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