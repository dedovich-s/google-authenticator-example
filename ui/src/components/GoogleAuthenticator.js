import React, {Component} from 'react';
import axios from 'axios';

class GoogleAuthenticator extends Component {

  state = {
    qrCodeUrl: null,
    code: null,
    validation: null
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
      .then(response => {
        if (response.data === true) {
          this.setState({validation: valid})
        } else {
          this.setState({validation: invalid})
        }
      });
  };

  render() {
    return (
      <div className={'row'}>
        <div className={'col-xs-6'}>
          <div className="card">
            <div className="card-header">
              <h1>Google Authenticator</h1>
            </div>
            <div className="card-body">
              <p className="card-text">Click button 'Generate QR code'</p>
              <div className='row'>
                <button className={'btn btn-default'} onClick={this.handleGenerateQrCode}>Generate QR code</button>
              </div>
              <div className={'row'}>
                <img src={this.state.qrCodeUrl}/>
              </div>
              <p className="card-text">Validate QR code below</p>
              {this.state.validation}
              <div className="input-group mb-3">
                <input type="text"
                       className="form-control"
                       placeholder="Validate code"
                       aria-label="Validate code"
                       aria-describedby="button-addon2"
                       maxLength={6}
                       minLength={6}
                       onChange={this.handleCodeInput}/>
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    id="button-addon2"
                    onClick={this.handleValidateCode}>Validate code
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GoogleAuthenticator;

const invalid = (
  <div className="alert alert-danger" role="alert">
    Invalid!
  </div>
);

const valid = (
  <div className="alert alert-success" role="alert">
    Valid!
  </div>
);