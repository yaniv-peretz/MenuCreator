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
        <div>
          <input id="login-sub" type="submit" value="LogIn"/>
          <button type="submit" formaction="/api/login/reg">Register New user</button>
        </div>
        </form>
      </div>
    );
  }
}

export default LoginBox;
