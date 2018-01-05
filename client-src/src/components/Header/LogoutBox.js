import React, { Component } from 'react';

class LogoutBox extends Component {
    logOutUser() {
        //Log Out user promise
          let url = 'api/login/';
          const xhr = new XMLHttpRequest();
          xhr.open("DELETE", url, true);          
          xhr.send();
          window.location = "/";
      }

    render() {
        return (
            <div className="login-buttons">
                <button onClick={() => this.logOutUser()}> Log Out </button>
            </div>
        );
    }
}

export default LogoutBox;