import swal from "sweetalert";
import axios from "axios";
import { observable } from "mobx";

export default class MenuStore {
  @observable id = 0;
  @observable items = [];
  @observable resturantName = [];
  constructor() {
    (async ()=>{
      this.id = await setId.call(this);
      getItems.call(this, this.id);
      getTitle.call(this, this.id);
    })();
  }

  getId() {
    return this.id;
  }

  addItem(index) {
    const url = `/api/menu-item/`;
    let newItem = {
      id: 0,
      sequence: index + 1,
      title: "new name",
      price: 10,
      description: "new description"
    };
    axios
      .post(url, newItem)
      .then(newId => {
        newItem.id = newId.data;
        if (0 < this.items.length) {
          this.items.forEach(item => {
            if (item.sequence >= newItem.sequence) {
              item.sequence++;
            }
          });
        }
        this.items.splice(newItem.sequence, 0, newItem);
      })
      .catch(err => {
        swal("Adding New Item Faild", "", "fail");
        console.error(err);
      });
  }

  deleteItem(id, index) {
    if (!id || id < 1 || !index || index < 1) {
      return;
    }

    const url = `/api/menu-item/${id}`;
    axios
      .delete(url)
      .then(() => {
        const items = this.items;
        const deletedSeq = items[index];
        items.splice(index, 1);
        items.forEach(menuItem => {
          if (deletedSeq < menuItem.sequence) {
            menuItem.sequence--;
          }
        });
      })
      .catch(() => {
        swal(
          "Item not Deleted",
          `somthing went wrong with deleting item id:${id}!`,
          "fail"
        );
      });
  }

  updateItem(index, field, newVal) {
    const editItem = this.items[index];
    const preValue = editItem[field];
    editItem[field] = newVal;

    const url = `/api/menu-item/`;
    axios
      .put(url, editItem)
      .then(() => {
        this.items[index] = editItem;
      })
      .catch(() => {
        editItem[field] = preValue;
        swal("Something Went Wrong!", "updating item failed", "fail");
      });
  }

  updateResturantName(newName) {
    const url = `/api/rest-name/`;
    axios
      .put(url, { rest_name: newName })
      .then(() => {
        this.resturantName = newName;
      })
      .catch(() => {
        swal("Something Went Wrong!", "updating title failed", "fail");
      });
  }
}

/** ##################
 *    Init functions
 ################## */

async function setId() {
  const match = "id=";
  if(window.location.toString().includes(match)){
    const location = window.location.toString()    
    const id = location.substr(location.indexOf(match) + match.length);
    return id
  }else{
    let url = "/api/login/rest_id";
    const id = await axios
    .get(url)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.error(err);
      return 0;
    });
    return id;
  }
}

function getItems(id) {
  let url = "/api/menu";
  if (id !== null) {
    //fetch in view mode
    url += `/view/${id}`;
  }
  axios
    .get(url)
    .then(res => {
      this.items = this.items.concat(res.data);
    })
    .catch(err => {
      console.error(err);
    });
}

function getTitle(id) {
  let url = "/api/rest-name";
  if (id !== null) {
    //fetch in view mode
    url += `/${id}`;
  }
  axios
    .get(url)
    .then(res => {
      this.resturantName = res.data;
    })
    .catch(err => {
      console.error(err);
    });
}
