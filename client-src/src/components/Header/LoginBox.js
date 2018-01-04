import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

class LoginBox extends Component {


  loginAjax() {
    var obj = this;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
      console.log(`this.readyState:${xhttp.readyState} this.status:${xhttp.status}`)
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        window.location = '/edit-menu';
      } else if (this.readyState == 4) {
        alert('user and password incorrect');
      }
    };

    var credentials = {
      email: document.querySelector('#email').value,
      passowrd: document.querySelector('#password').value
    }

    if (credentials.email == undefined || credentials.passowrd == undefined) {
      return;
    }

    var url = 'api/login/reg'
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(credentials));
  }
  render() {

    return (
      <div id="login">
        <div>
          <div><span>Email:</span><input id="email" name="email" className="loginInput" /> </div>
          <div><span>Password:</span><input id="password" name="password" type="password" className="loginInput" /> </div>
        </div>
        <div className="login-buttons">
          <input id="login-sub" type="submit" value="Log In" />
          <button onClick={() => this.loginAjax()}>Sign In</button>
        </div>
      </div>
    );
  }
}

export default LoginBox;
