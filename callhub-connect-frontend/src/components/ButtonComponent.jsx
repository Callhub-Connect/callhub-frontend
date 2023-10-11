import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

class ButtonComponent extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("running")
    // Handle the form submission here
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch("https://connect.greenplant-1b2a73a7.eastus.azurecontainerapps.io/mongotest", requestOptions)
      .then(async response => {
        // check if reponse successful
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const id = await response.text()

        alert(`A user was created successfully with ID: ${id}.`);
      })
      .then(result => {
        console.log(result)
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
        <button type="button" class="btn btn-primary btn-lg" onClick={this.handleSubmit}>Create a User</button>
      </div>
    );
  }
}

export default ButtonComponent;
