import React, { Component } from 'react';
import ItemContect from './ItemContect.js';

class DisplayItem extends Component {
  render() {
    return (
      <div
        className="Menu-Item-Container" >

        <ItemContect
          title     = {this.props.title}
          descr     = {this.props.descr}
          price     = {this.props.price}
          edit      = {this.props.edit}
          index     = {this.props.index}  />

      </div>
    );
  }// end of render

}// end of DisplayItem
export default DisplayItem;
