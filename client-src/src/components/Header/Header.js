import React, { Component } from 'react';
import LoginBox from './LoginBox.js';
import LogoutBox from './LogoutBox.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import port from "../../api-config/api-config.js";
import '../../style/header.css';


class Header extends Component {
  render() {
    var url = 'http://localhost:'+port;

    return (
      <div className="header">
        <h1><a href={url}>My Menu</a></h1>

        <Router>
          <Switch>
            <Route exact path='/' component={LoginBox} />
            <Route exact path='/edit-menu' component={LogoutBox} />
          </Switch>
        </Router>
      </div>
    );
  }

}

export default Header;
