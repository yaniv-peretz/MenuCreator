import React, { Component } from "react";
import MenuTitle from "../Menu/Menu-Title.js";
import Menu from "../Menu/Menu.js";

class MenuPage extends Component {
  render() {
    return (
      <div>
        <MenuTitle editMode={this.props.editMode}/>
        <Menu editMode={this.props.editMode}/>
      </div>
    );
  }
}

export default MenuPage;
