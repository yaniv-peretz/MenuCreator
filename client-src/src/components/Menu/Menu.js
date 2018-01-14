import React, { Component } from "react";
import swal from "sweetalert";
import Item from "./Item.js";
import "../../js/checkAuth.js";
import "../../style/Menu.css";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: []
    };
    this.removeItem = this.removeItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.editItem = this.editItem.bind(this);
  }

  componentDidMount() {
    const url = "/api/menu";
    fetch(url, { credentials: "same-origin" })
      .then(response => response.json())
      .then(json => {
        if (0 < json.length) {
          json.sort((a, b) => a.seq - b.seq);
          this.setState({ menu: json });
        } else if (json.length === 0) {
          this.initializeMenu();
        }
      });
  }

  initializeMenu() {
    //Only on empty, or first item insertion
    this.addItem(-1);
  }

  addItem(index) {
    // adding item to state only if succesful on the server
    let newItem = {
      item_id: 0,
      seq: index + 1,
      title: "new name",
      price: 10,
      descr: "new description"
    };

    let addItemPromise = new Promise((resolve, reject) => {
      let xhttp = new XMLHttpRequest();
      const url = `/api/menu-item/`;
      xhttp.open("POST", url, true);
      xhttp.onload = () => {
        if (xhttp.readyState === 4) {
          if (xhttp.status === 200) {
            resolve(xhttp.responseText);
          } else {
            reject(xhttp.status);
          }
        }
      };
      xhttp.setRequestHeader("Content-type", "application/json");
      xhttp.send(JSON.stringify(newItem));
    });

    let menu = this.state.menu;
    addItemPromise.then(
      response => {
        newItem.item_id = response;
        if (0 < menu.length) {
          menu.forEach(item => {
            if (item.seq >= newItem.seq) {
              item.seq++;
            }
          });
        }
        menu.splice(newItem.seq, 0, newItem);
        this.setState({ menu: menu });
      },
      () => {
        swal("Adding New Item Faild", "", "fail");
      }
    );
  }

  editItem(index, field, newVal) {
    let menu = this.state.menu;
    let editItem = menu[index];
    switch (field) {
      case "title":
      editItem.title = newVal;
      break;
      case "price":
      editItem.price = newVal;
      break;
      case "descr":
      editItem.descr = newVal;
      break;
      default:
    }
    
    let updatePromise = new Promise((resolve, fail)=>{
      const url = `/api/menu-item/`;
      let xhttp = new XMLHttpRequest();
      xhttp.open("PUT", url, true);
      xhttp.onload = ()=>{
        if(xhttp.readyState === 4){
          if(xhttp.status === 200){
            resolve();
          }else{
            fail();
          }
        }
      }
      xhttp.setRequestHeader("Content-type", "application/json");
      xhttp.send(JSON.stringify(editItem));
      
    });
    
    updatePromise.then(()=>{
      menu[index] = editItem;
      this.setState({
        menu: menu
      });
    },()=>{
      swal("Something Went Wrong!","updating item failed","fail");
    })
  }

  removeItem(id) {
    if (!id || id < 1) {
      return;
    }

    //try to delete menu item from DB
    let deleteItemFromMenu = new Promise((resolve, reject) => {
      const url = `/api/menu-item/${id}`;
      const xhr = new XMLHttpRequest();
      xhr.open("DELETE", url, true);
      xhr.onload = () => {
        let menu = this.state.menu;
        let itemIndex = menu.findIndex(item => {
          return item.item_id === id;
        });
        let itemToDelete = menu[itemIndex];
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(itemToDelete);
          } else {
            reject(itemToDelete);
          }
        }
      };
      xhr.send();
    });

    deleteItemFromMenu.then(
      item => {
        let menu = this.state.menu;
        menu.map(menuItem => {
          if (item.seq < menuItem.seq) {
            menuItem.seq--;
          }
          return menuItem;
        });
        menu.splice(item.seq, 1);
        this.setState({
          menu: menu
        });
        swal(`${item.title} deleted!`);
      },
      item => {
        swal(
          "Item not Deleted",
          `somthing went wrong with deleting ${item.title}!`,
          "fail"
        );
      }
    );
  }

  render() {
    const menu = this.state.menu;
    const menuItems = menu.map((item, index) => (
      <Item
        key={item.item_id}
        index={index}
        seq={item.seq}
        title={item.title}
        price={item.price}
        descr={item.descr}
        edit={this.editItem}
        add={this.addItem}
        remove={this.removeItem}
      />
    ));

    return (
      <div>
        <div className="Menu-Container">{menuItems}</div>
      </div>
    );
  }
}
export default Menu;
