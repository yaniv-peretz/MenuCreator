import React, { Component } from 'react';
import { Redirect, BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './Login';
import EditMenu from './Edit-Menu';
import ViewMenu from './View-Menu';

class Routes extends Component {
  constructor() {
    super();
    this.state = {
      redirectState: false,
      path: "/"
    }

    this.setRedirect = this.redirect.bind(this);
  }

  redirect(redirectPath) {
    this.setState({
      redirectState: true,
      path: redirectPath || "/"
    })
  }

  render() {
    if (this.state.redirectState) {
      this.setState.redirectState = false
      return (
        <div>
          <Router>
            <Redirect to={this.state.path} />            
          </Router>
        </div>
      );
    }

    return (
      <Router>
        <Switch>
          <Route exact path='/' render={() => (<Login setRedirect={this.setRedirect} />)} />
          <Route exact path='/edit-menu' component={EditMenu} />
          <Route path='/view-menu/:rest_id' component={ViewMenu} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;
