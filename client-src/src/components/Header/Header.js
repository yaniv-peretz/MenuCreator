import React, { Component } from "react";
import LoginBox from "./LoginBox.js";
import LogoutBox from "./LogoutBox.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-primary">
        <a className="navbar-brand">Menu Creator</a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
          </ul>
          <div className="login-inputs">
            <Router>
              <Switch>
                <Route exact path="/" component={LoginBox} />
                <Route exact path="/edit-menu" component={LogoutBox} />
              </Switch>
            </Router>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
