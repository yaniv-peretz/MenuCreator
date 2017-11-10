import React, { Component } from 'react';
import Header from './components/Header/Header.js';
import Menu  from './components/Menu/Menu-Viewer.js';


class ViewMenu extends Component {
  render() {
    return (
      <div >
        <Header />
        <h1>your on the View Menu Page</h1>
        <Menu />
    </div>
    );
  }
}

export default ViewMenu;
