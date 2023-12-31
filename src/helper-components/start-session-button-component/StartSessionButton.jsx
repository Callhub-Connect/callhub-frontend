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
    axios.get("https://connect.greenplant-1b2a73a7.eastus.azurecontainerapps.io/session/new-session")
      .then(function (response) {
        let sessionCode = response.data.sessionCode;
        sessionStorage.setItem('sessionCode', sessionCode);
        let sessionId = response.data.sessionId;
        sessionStorage.setItem('sessionId', sessionId);
        connectWebsocket('employee', sessionId);
        localStorage.setItem('isSessionActive', 'true');
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