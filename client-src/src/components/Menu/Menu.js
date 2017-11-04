import React, { Component } from 'react';
import Item from './Item.js';
import '../../js/checkAuth.js';
import '../../style/Menu.css';


class Menu extends Component {

  constructor(props) {
    super(props);

    this.state = {data: []};

    this.removeItem = this.removeItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.editItem = this.editItem.bind(this);

  }

  componentDidMount(){
    // let rest_id = 100;
    // this.loadData(rest_id);
    this.loadData();
  }

  // loadData(rest_id){
  //   let url ="http://localhost:8080/api/menu/v?rest_id=" + rest_id;
  //   fetch(url)
  //         .then(response => response.json())
  //         .then(json => {
  //           this.setState({
  //             data: json,
  //           });
  //         });
  // }

  loadData(){
    let url ="http://localhost:8080/api/menu/";
    fetch(url, {credentials: 'same-origin' })
          .then(response => response.json())
          .then(json => this.setState({data: json}))
  }

  removeItem(key){
    let menu = this.state.data;
    menu.splice(key, 1);

    this.setState({
      data: menu
    });
  }

  addItem(key){
    let menu = this.state.data;
    let obj = {
      title: "new name",
      price: 10,
      descr: "new description"
    }
    menu.splice(key, 0, obj );

    this.setState({
      data: menu
    });
  }

  editItem(key, field, newText){
    let menu = this.state.data;
    let obj = menu[key];

    switch (field) {
      case "title":
        obj.title = newText;
      break;

      case "price":
        obj.price = newText;
        break;

      case "descr":
        obj.descr = newText;
        break;

      default:

    }

    this.setState({
      data: menu
    });
  }

  render() {

    const menu = this.state.data;
    const menuItems = menu.map((item , index) =>
      <Item
        key = {index}
        index = {index}
        title = {item.title}
        price = {item.price}
        descr = {item.descr}
        edit = {this.editItem}
        add = {this.addItem}
        remove = {this.removeItem}/>
      );

    return(
      <div className="Menu-Container">
        {menuItems}
      </div>
    );
  }// end of render

}// end of Itme
export default Menu;

