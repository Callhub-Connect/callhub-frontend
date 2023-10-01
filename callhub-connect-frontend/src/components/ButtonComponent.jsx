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
    
    fetch("http://127.0.0.1:8000/createuser", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    console.log(this.state);
  }

  render() {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }}>
        <button type="button" class="btn btn-success" onClick={this.handleSubmit}>Create a User</button>
      </div>
    );
  }
}

export default ButtonComponent;
