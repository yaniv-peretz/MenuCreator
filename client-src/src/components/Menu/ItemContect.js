import React, { Component } from "react";

class ItemContect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      price: this.props.price,
      descr: this.props.descr
    };
    this.changeTitle = this.changeTitle.bind(this);
    this.changePrice = this.changePrice.bind(this);
    this.changeDescr = this.changeDescr.bind(this);
  }

  changeTitle(event) {
    this.setState({ title: event.target.value });
    this.props.edit(this.props.index, "title", event.target.value);
  }

  changePrice(event) {
    this.setState({ price: event.target.value });
    this.props.edit(this.props.index, "price", event.target.value);
  }

  changeDescr(event) {
    this.setState({ descr: event.target.value });
    this.props.edit(this.props.index, "descr", event.target.value);
  }

  render() {
    let price = this.state.price;
    let descr = this.state.descr;

    if (this.props.editMode) {
      return (
        <div className="Item-Name">
          <input
            type="text"
            value={this.state.title}
            onChange={this.changeTitle}
          />

          <input
            type="number"
            value={this.state.price}
            onChange={this.changePrice}
          />

          <input
            type="text"
            value={this.props.descr}
            onChange={this.changeDescr}
          />
        </div>
      );
    } else {
      return (
        <div className="Item">
          <div className="item-title">
            <div>{this.state.title}</div>
            <div>{price}</div>
          </div>
          <div className="item-descr">{descr}</div>
        </div>
      );
    }
  }
}
export default ItemContect;
