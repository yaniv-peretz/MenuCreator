var list;
var buttons;

getEditMenu();




function getEditMenu() {
  let url ="api/menu/";
  ajax("get", url, setEditMenu)
}

function setEditMenu(obj) {
  if(list == null){
    list = obj;

    list.forEach(function(item, index){
      item.edit = false;
    });
  }

  let txt ="";
  list.forEach(function(item, index){

    txt += "<div class=items>";
    if(!item.edit){
      txt +=  "<b>" + item.title + "</b> <span>" + item.price + "</span>" +
              "<p>" + item.descr + "</p>";
    }else{
      txt +=  "<input value=" + item.title  + " id=title" + index + " /> <BR>" +
              "<input value=" + item.price  + " id=price" + index + " /> <BR>" +
              "<input value=" + item.descr   + " id=descr" + index  + " /> <BR>";
    }

    txt +=  "<button onclick  = addItem("+index+")     >add</button>"     +
            "<button onclick  = removeItem("+index +","+item.item_id+")  >remove</button>"  +
            "<button onclick  = editItem("+index+")    >edit</button> "   +
            "</div>";
  });

  menu = document.querySelector("#menu");
  menu.innerHTML = txt;
}




function addItem(index){
  //TODO handler for sequance duplication
  let newItem = {
    rest_id : id,
    item_id : list.length,
    seq     : list.length,
    title   : "new Food",
    descr   : "new descr",
    price   : 0,
    edit    : false
  };

  let url ="api/menu-item";
  let params = JSON.stringify(newItem);
  ajaxSend("post", url, params);

  list.splice(index, 0, newItem);
  editItem(index);
  setEditMenu();
}



function removeItem(index, item_id){
  list.splice(index, 1);

  let url ="api/menu-item";
  let params = JSON.stringify( {rest_id:id, item_id:item_id} );
  ajaxSend("delete", url, params);

  setEditMenu();
}




function editItem(index){
  let item = list[index];

  if(item.edit){
    item.title  = document.querySelector('#title'+index).value;
    item.price  = document.querySelector('#price'+index).value;
    item.descr  = document.querySelector('#descr'+index).value;

    let url ="api/menu-item";
    let params = JSON.stringify(item);
    ajaxSend("put", url, params);
  }

  item.edit = !item.edit;
  setEditMenu(list);
}
