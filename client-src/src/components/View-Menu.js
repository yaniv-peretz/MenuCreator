import React, { Component } from 'react';
import Header from './Header/Header.js';
import Menu  from './Menu/Menu-Viewer.js';
import MenuTitle from './MenuTitle/MenuTitle.js';


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
