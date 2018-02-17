import React, { Component } from "react";
import { observer } from "mobx-react";

@observer
class ItemContect extends Component {
  constructor(props) {
    super(props);
    this.changeTitle = this.changeTitle.bind(this);
    this.changePrice = this.changePrice.bind(this);
    this.changeDescription = this.changeDescription.bind(this);
  }

  changeTitle(event) {
    this.props.store.updateItem(this.props.index, "title", event.target.value)
  }

  changePrice(event) {
    this.props.store.updateItem(this.props.index, "price", event.target.value);
  }

  changeDescription(event) {
    this.props.store.updateItem(this.props.index, "description", event.target.value);
  }

  render() {
    const props = this.props;

    if (!props.itemEditMode) {
      return (
        <div className="Item">
          <div className="item-title">
            <div>{props.title}</div>
            <div>{props.price}</div>
          </div>
          <div className="item-descr">{props.description}</div>
        </div>
      );
    } else {
      return (
        <div>
          <input
            type="text"
            value={props.title}
            onChange={this.changeTitle}
          />

          <input
            type="number"
            value={props.price}
            onChange={this.changePrice}
          />

          <input
            type="text"
            value={props.description}
            onChange={this.changeDescription}
          />
        </div>
      );
    }
  }
}
export default ItemContect;
