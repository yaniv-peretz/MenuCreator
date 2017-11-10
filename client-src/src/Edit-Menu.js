import React, { Component } from 'react';
import Header from './components/Header/Header.js';
import Menu from './components/Menu/Menu.js';


class EditMenu extends Component {
  render() {
    return (
      <div >
        <Header />
        <h1>your on the EditMenu Page</h1>
        <Menu   />
      </div>
    );
  }
}

export default EditMenu;
