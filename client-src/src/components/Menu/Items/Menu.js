import React, { Component } from "react";
import Item from "./Item.js";
import "../../../style/Menu.css";
import { observer } from "mobx-react";

@observer
class Menu extends Component {
  render() {
    const items = this.props.store.items;
    const menuItems = items.map((item, index) => {
      const props = item;
      return <Item {...this.props} {...props} key={item.id} index={index} />;
    });
    return (
      <div className="Menu-Container">
        {menuItems}
      </div>
    );
  }
}
export default Menu;
