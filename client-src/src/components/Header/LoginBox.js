import React, { Component } from 'react';

class LoginBox extends Component {
  render() {
    return (
      <div id="login">
        <form action="localhost:8080/e">
        <div>
          <div><span>Email:</span><input name="userName" className="loginInput"/> </div>
          <div><span>Password:</span><input name="PSW" type="password" className="loginInput"/> </div>
        </div>
        <div>
          <input id="login-sub" type="submit" value="LogIn"/>
        </div>
        </form>
      </div>
    );
  }
}

export default LoginBox;
