import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios'

class StartSessionButton extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    
    //TODO: replace with hosted address
    axios.get("http://localhost:8080/session/new-session")
      .then(function (response) {
        console.log(response);
        let sessionCode = response.data.sessionCode;
        sessionStorage.setItem('sessionCode', sessionCode);
        let sessionId = response.data.sessionId;
        sessionStorage.setItem('sessionId', sessionId);
        console.log(sessionCode);
      })
      .catch(error => {
        console.log('error', error)
      });
    console.log(this.state);
  }

  render() {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }}>
        <button type="button" className="btn btn-success btn-lg" onClick={this.handleSubmit}>Start Session</button>
      </div>
    );
  }
}

export default StartSessionButton;
