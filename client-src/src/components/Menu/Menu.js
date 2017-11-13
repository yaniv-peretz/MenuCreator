import React, { Component } from 'react';
import Item from './Item.js';
import '../../js/checkAuth.js';
import '../../style/Menu.css';

var api ='http://localhost:8080/api/menu-item/';


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

    this.removeItem = this.removeItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.editItem = this.editItem.bind(this);
  }

  componentDidMount(){
    let url ='http://localhost:8080/api/menu';
    fetch(url, {credentials: 'same-origin' })
          .then(response => response.json())
          .then(json => {
            json.sort((a,b)=>(a.seq - b.seq))
            this.setState({data: json});
          })
  }


  setMenu(menu){
    this.setState({
      data: this.responseText
    });
  }descr


  addItem(key){

    let menu = this.state.data;
    menu.forEach(element => {
      if(element.seq > key){
        element.seq++
      }
    });

    let obj = {
      item_id : menu.length,
      seq     : key+1,
      title   : "new name",
      price   : 10,
      descr   : "new description"
    }
    
    menu.splice(key + 1, 0, obj)

    this.setState({
      data: menu
    });

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", api, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(obj));

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

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", api, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(obj));
  }


  removeItem(key){
    let menu = this.state.data;

    let obj = menu.find(function (element) {
      return element.seq == key      
    })

    //delete object form client size
    let objIndex = menu.findIndex(function (element) {
      return element.seq == key      
    })
    menu.splice(objIndex, 1);

    this.setState({
      data: menu
    });

    //delet object from DB
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", api, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(obj));
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
