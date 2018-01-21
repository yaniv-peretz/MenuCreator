import React, { Component } from "react";
import {
  Redirect,
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

// UI components
import Header from "./Header/Header.js";
import LoginPage from "./pages/Login";
import MenuPage from "./pages/MenuPage";

class MainRoute extends Component {
  constructor() {
    super();
    this.state = {
      isRedirecting: false,
      path: "/"
    };

    this.redirect = this.redirect.bind(this);
  }

  redirect(destination) {
    this.setState({
      redirectState: true,
      path: destination || "/"
    });
  }

  render() {
    // Redirect to given Path
    if (this.state.isRedirecting) {
      this.setState.redirectState = false;
      return (
        <div>
          <Router>
            <Redirect to={this.state.path} />
          </Router>
        </div>
      )
    }

    // show component by path
    return (
      <div>
        <Header setRedirect={this.redirect} />
        <Router>
          <Switch>
            <Route exact path="/" component={LoginPage} />
            <Route path="/edit-menu" render={() => (<MenuPage editMode={true} />)} />
            <Route path="/view-menu" render={() => (<MenuPage editMode={false} />)} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default MainRoute;
