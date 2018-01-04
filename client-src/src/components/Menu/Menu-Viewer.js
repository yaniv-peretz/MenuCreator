import React, { Component } from 'react';
import DisplayItem from './DisplayItem.js';
import '../../style/Menu.css';

let path = window.location.pathname;
var api ="api/menu"+path;

class Menu extends Component {

  constructor(props) {
    super(props);

    this.state = {data: [
      {
        item_id : 1,
        seq     : 1,
        title   : "new name",
        price   : 10,
        descr   : "new description"
      }
    ]};

  }

  componentDidMount(){

    this.loadData();
  }


  loadData(){
    let url = api;
    fetch(url, {credentials: 'same-origin' })
          .then(response => response.json())
          .then(json => {
            json.sort((a,b)=>(a.seq - b.seq))
            this.setState({data: json})
            })
  }


  render() {

    const menu = this.state.data;
    const menuItems = menu.map((item , index) =>
      <DisplayItem
        key = {index}
        index = {index}
        title = {item.title}
        price = {item.price}
        descr = {item.descr}
        />
      );

    return(
      <div className="Menu-Container">
        {menuItems}
      </div>
    );
  }// end of render

}// end of Itme
export default Menu;
