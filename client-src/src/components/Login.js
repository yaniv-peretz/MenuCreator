import React, { Component } from 'react';
import Header from './Header/Header.js';
import LandingPage from './LandingPage/LandingPage.js';
import "../style/index.css"

class Login extends Component {
  render() {
    return (
      <div>
        <Header />
        <LandingPage />
        <img src={ require('../style/Resources/Demo.gif') } className="demo-pic"/>
      </div>
    );
  }
}

export default Login;