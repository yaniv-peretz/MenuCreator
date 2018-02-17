import React, { Component } from "react";
import MenuTitle from "../Menu/Title/Menu-Title.js";
import Menu from "../Menu/Items/Menu.js";

import MenuStore from '../../store/MenuStore.js';
import { observer } from 'mobx-react';

@observer
class MenuPage extends Component {
  constructor(props) {
    super(props);
    this.store = new MenuStore(1)
  }
  
  render() {
    return (
      <div>
        <MenuTitle store={this.store} editMode={this.props.editMode} />
        <Menu store={this.store} editMode={this.props.editMode} />
      </div>
    );
  }
}

export default MenuPage;
