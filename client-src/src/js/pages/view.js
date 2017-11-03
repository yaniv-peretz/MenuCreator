var id = getParameterByName("id");
getMenu(id);


function getMenu(id) {
  let url ="http://localhost:8080/api/menu?id=" + id;
  ajax("get", url, setMenu)
}

function setMenu(obj) {
  var txt ="";
  let menu = obj.map(function(item) {
   txt += "<div><b>" + item.title + "</b> <span>" + item.price + "</span>" +
          "<p>" + item.desc + "</p></div>";
  });

  element = document.querySelector("#menu");
  element.innerHTML = txt;
}
