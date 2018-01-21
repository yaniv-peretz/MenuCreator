import React, { Component } from "react";
import "../../style/index.css";

class Login extends Component {
  render() {
    return (
      <div>
        <div className="landing-message">
          <h3>Welcome to Menu Creator</h3>
          <p>
            Menu Creator make it easy for you to create a new resturant menu amd
            upload it on line
          </p>
          <p>Sign in to create new user, than log in</p>
        </div>
        <img
          src={require("../../resources/presentation.gif")}
          className="landing-picture"
          alt="presentation of menu creator"
        />
      </div>
    );
  }
}

export default Login;

