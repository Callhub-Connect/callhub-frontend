import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { connectWebsocket } from '../../websocket';
import { useNavigate } from 'react-router-dom';
import { Button } from './StartSessionButton.styles';

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
