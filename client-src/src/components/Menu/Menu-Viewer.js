import React, { Component } from 'react';
import DisplayItem from './DisplayItem.js';
import '../../style/Menu.css';

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };

  }

  componentDidMount() {
    this.loadData();
  }


  loadData() {
     var current_url = new URL(window.location.href);
     var rest_id = current_url.searchParams.get("rest_id");

     const url = `/api/menu/view/${rest_id}`;
    fetch(url, { credentials: 'same-origin' })
      .then(response => response.json())
      .then(json => {
        json = json.sort((a, b) => (a.seq - b.seq))
        this.setState({ data: json })
      })
  }


  render() {

    const menu = this.state.data;
    const menuItems = menu.map((item, index) =>
      <DisplayItem
        key={index}
        index={index}
        title={item.title}
        price={item.price}
        descr={item.descr}
      />
    );

    return (
      <div className="Menu-Container">
        {menuItems}
      </div>
    );
  }// end of render

}// end of Itme
export default Menu;
