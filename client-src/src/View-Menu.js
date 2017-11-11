import React, { Component } from 'react';
import Header from './components/Header/Header.js';
import Menu  from './components/Menu/Menu-Viewer.js';
import MenuTitle from './components/MenuTitle/MenuTitle.js';


class ViewMenu extends Component {
  render() {
    return (
      <div >
        <Header />
        <MenuTitle />
        <Menu />
    </div>
    );
  }
}

export default ViewMenu;
