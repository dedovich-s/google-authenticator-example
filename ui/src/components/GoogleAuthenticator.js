import React, {Component} from 'react';
import axios from 'axios';

class GoogleAuthenticator extends Component {

  state = {
    qrCodeUrl: null,
    code: null
  };

  handleGenerateQrCode = () => {
    axios.get('http://localhost:8080/googleAuthenticator/getQrCodeUrl')
      .then(response => {
        this.setState({qrCodeUrl: response.data})
      });
  };

  handleCodeInput = (event) => {
    this.setState({code: event.target.value})
  };

  handleValidateCode = () => {
    axios.post('http://localhost:8080/googleAuthenticator/validateCode/' + this.state.code)
      .then(response => console.log(response.data));
  };

  render() {
    return (
      <div>
        <button onClick={this.handleGenerateQrCode}>Generate QR code</button>

        <img src={this.state.qrCodeUrl}/>

        <input maxLength={6} minLength={6} onChange={this.handleCodeInput}/>

        <button onClick={this.handleValidateCode}>Validate code</button>

      </div>
    );
  }
}

export default GoogleAuthenticator;