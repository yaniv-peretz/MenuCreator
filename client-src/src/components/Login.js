import React, { Component } from 'react';
import Header from './Header/Header.js';
import LandingPage from './LandingPage/LandingPage.js';


class Login extends Component {
  render() {
    return (
      <div>
        <Header />
        <LandingPage />
      </div>
    );
  }
}

export default Login;
