import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class LoginBox extends Component {
  logInAsUser() {
    //creating user promise
    let user = new Promise((resolve, reject) => {
      let url = 'api/login/'
      let credentials = {
        email: document.querySelector('#email').value,
        passowrd: document.querySelector('#password').value
      }
      if (credentials.email == undefined || credentials.passowrd == undefined) { return }

      const xhr = new XMLHttpRequest();
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.onload = () => {
        if (xhr.status == 200) {
          resolve();
        } else {
          reject()
        }
      }
      xhr.onerror = () => reject();
      xhr.send(JSON.stringify(credentials));

    });

    user.then((status) => {
      window.location = "/edit-menu"
    }, (status) => {
      alert(`cannot login`)
    })
  }

  registerNewUser() {
    //creating user promise
    let newUser = new Promise((resolve, reject) => {
      let url = 'api/login/reg'
      let credentials = {
        email: document.querySelector('#email').value,
        passowrd: document.querySelector('#password').value
      }
      if (credentials.email == undefined || credentials.passowrd == undefined) { return }

      const xhr = new XMLHttpRequest();
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.onload = () => {
        if (xhr.status == 200) {
          resolve();
        } else {
          reject()
        }
      }
      xhr.onerror = () => reject();
      xhr.send(JSON.stringify(credentials));

    });

    newUser.then((status) => {
      alert("new user is created, please login!")
    }, (status) => {
      alert(`cannot create user and passowrd`)
    })
  }

  render() {
    return (
      <div id="login">
        <div>
          <div><span>Email:</span><input required id="email" name="email" className="loginInput" /> </div>
          <div><span>Password:</span><input required id="password" name="password" type="password" className="loginInput" /> </div>
        </div>
        <div className="login-buttons">

          <button onClick={() => this.logInAsUser()}> Log In </button>
          <button onClick={() => this.registerNewUser()}> Sign In </button>
        </div>
      </div>
    );
  }
}

export default LoginBox;
