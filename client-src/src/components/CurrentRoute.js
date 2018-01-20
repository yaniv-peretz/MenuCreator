import React, { Component } from "react";
import {
  Redirect,
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import LoginPage from "./pages/Login";
import EditMenu from "./pages/Edit-Menu";
import ViewMenu from "./pages/View-Menu";

class CurrentRoute extends Component {
  constructor() {
    super();
    this.state = {
      isRedirecting: false,
      path: "/"
    };

    this.changePath = this.redirect.bind(this);
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
      );
    }

    // show component by path
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <LoginPage setRedirect={this.changePath} />}
          />
          <Route path="/edit-menu" component={EditMenu} />
          <Route path="/view-menu" component={ViewMenu} />
        </Switch>
      </Router>
    );
  }
}

export default CurrentRoute;
