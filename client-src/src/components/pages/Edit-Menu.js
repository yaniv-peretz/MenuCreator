import React, { Component } from "react";
import Header from "../Header/Header.js";
import Menu from "../Menu/Menu.js";
import MenuTitle from "../MenuTitle/MenuTitle.js";

class EditMenu extends Component {
  render() {
    return (
      <div>
        <Header />
        <MenuTitle edit={true}/>
        <Menu />
      </div>
    );
  }
}

export default EditMenu;
