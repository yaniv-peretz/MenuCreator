import React, { Component } from 'react';
import LoginBox from './LoginBox.js';
import '../../style/header.css';

class Header extends Component {

  render() {
    return (
      <div className="header">
        <h1>My Menu</h1>
        <LoginBox />
      </div>
    );
  }

}

export default Header;
