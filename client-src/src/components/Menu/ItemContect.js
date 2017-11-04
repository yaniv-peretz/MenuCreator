import React, { Component } from 'react';

class ItemContect extends Component {
  render(){
    let title = this.props.title;
    let price = this.props.price;
    let descr = this.props.descr;

    if(this.props.editMode){
      let itemName  = title+this.props.index;
      let itemPrice = price + this.props.index;
      let itemDescr = descr + this.props.index;

      return(
        <div
          className="Item-Name">
          <input
            type="text"
            id={"item-title" + this.props.index}
            value={this.props.title}
            onChange={() => this.props.edit(
              this.props.index,
              "title",
              document.querySelector("#item-title" + this.props.index).value)}
              />

          <input
            type="number"
            id={"item-price" + this.props.index}
            value={this.props.price}
            onChange={() => this.props.edit(
              this.props.index,
              "price",
              document.querySelector("#item-price" + this.props.index).value)}
            />

          <input
            type="text"
            id={"item-descr" + this.props.index}
            value={this.props.descr}
            onChange={() => this.props.edit(
              this.props.index,
              "descr",
              document.querySelector("#item-descr" + this.props.index).value)}
            />
        </div>

      )
    }else{
      return(
        <div className="Item">
          <div className="master-details"><div>{this.props.title}</div>
          <div>{price}</div></div>
          <div className="descr">{descr}</div>
        </div>
      )

    }
  }
}
export default ItemContect;
