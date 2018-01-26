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

    let updatePromise = new Promise(resolve => {
      const url = `/api/menu-item/`;
      let xhttp = new XMLHttpRequest();
      xhttp.open("PUT", url, true);
      xhttp.onload = () => {
        if (xhttp.readyState === 4) {
          if (xhttp.status === 200) {
            resolve();
          }
        }
      }
      xhttp.setRequestHeader("Content-type", "application/json");
      xhttp.send(JSON.stringify(editItem));

    });

    updatePromise.then(() => {
      menu[index] = editItem;
      this.setState({
        menu: menu
      });
    }, () => {
      swal("Something Went Wrong!", "updating item failed", "fail");
    })
  }

  removeItem(id, index) {
    if (!id || id < 1) {
      return;
    }

    //try to delete menu item from DB
    let promiseToDeleteFromMenu = new Promise((resolve, reject) => {
      const url = `/api/menu-item/${id}`;
      let xhr = new XMLHttpRequest();
      xhr.open("DELETE", url, true);
      xhr.onload = () => {
        if (xhr.readyState === 4) {
          console.log(xhr.readyState + xhr.status);

          if (xhr.status === 200) {
            resolve(index);
          } else {
            reject(id);
          }
        }
      };
      xhr.send();
    });

    promiseToDeleteFromMenu.then(
      (index) => {
        let menu = this.state.menu;
        const deletedSeq = menu[index];
        menu.splice(index, 1);
        menu.map(menuItem => {
          if (deletedSeq < menuItem.seq) {
            menuItem.seq--;
          }
          return menuItem;
        });

        this.setState({
          menu: menu
        });
      }, id => {
        swal(
          "Item not Deleted",
          `somthing went wrong with deleting item id:${id}!`,
          "fail"
        );
      }
    );
  }

  render() {
    const menu = this.state.menu;
    const menuItems = menu.map((item, index) => (
      <Item
        id={item.item_id}
        key={item.item_id}
        index={index}
        seq={item.seq}
        title={item.title}
        price={item.price}
        descr={item.descr}
        // if menu not in edit mode, send false instead of connection to the menu items controls
        editMode={this.props.editMode}
        edit={this.props.editMode && this.editItem}
        add={this.props.editMode && this.addItem}
        remove={this.props.editMode && this.removeItem}
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
