import React, { Component } from 'react';

class LoginBox extends Component {
  render() {
    return (
      <div id="login">
        <form action='http://localhost:8080/api/login' method="post">
        <div>
          <div><span>Email:</span><input name="email" className="loginInput"/> </div>
          <div><span>Password:</span><input name="psw" type="password" className="loginInput"/> </div>
        </div>
        <div className="login-buttons">
          <input id="login-sub" type="submit" value="Log In"/>
          <button type="submit" formAction='http://localhost:8080/api/login/reg'>Sign In</button>
        </div>
        </form>
      </div>
    );
  }
}

export default LoginBox;
