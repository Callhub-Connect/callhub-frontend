import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import styled from 'styled-components';
import { connectWebsocket } from '../websocket';
import { useNavigate } from 'react-router-dom';


const Button = styled.button`
    height: 50px;
    width: 60%;
    background-color: #0b9f43;
    border-radius: 30px 30px 30px 30px;
    position: relative;
    color: white;
    font-family: 'League Spartan', sans-serif;
    font-size: x-large;
    border: 0px solid;
    cursor: pointer;
    &:hover {
        background-color: #076a2d;
    }
`
function StartSessionButton() {
  let navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    //TODO: replace with hosted address
    axios.get("http://localhost:8080/session/new-session")
      .then(function (response) {
        console.log(response);
        let sessionCode = response.data.sessionCode;
        sessionStorage.setItem('sessionCode', sessionCode);
        let sessionId = response.data.sessionId;
        sessionStorage.setItem('sessionId', sessionId);
        connectWebsocket('employee', sessionId);
        console.log(sessionCode);
        let path = `/session`;
        navigate(path);
      })
      .catch(error => {
        console.log('error', error)
      });
  }
  return (
    <Button onClick={handleSubmit}>Start Session</Button>
  );
}

export default StartSessionButton;