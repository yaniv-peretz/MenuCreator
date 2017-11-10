import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route ,Switch } from 'react-router-dom'
import Login from './Login';
import EditMenu from './Edit-Menu';
import ViewMenu from './View-Menu';


class Routes extends Component {
    render() {
      return (
        <div>
          <Router>
              <Switch>
                  <Route exact path='/'             component={Login}/>
                  <Route exact path='/edit-menu'    component={EditMenu}/>
                  <Route path='/view-menu/:rest_id' component={ViewMenu}/>
              </Switch>
          </Router>
        </div>
      );
    }
  }
  
  export default Routes;
  