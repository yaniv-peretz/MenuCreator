var rest_id = getParameterByName("rest_id");
getMenu(rest_id);


function getMenu(rest_id) {
  let url ="http://localhost:8080/api/menu/v?rest_id=" + rest_id;
  ajax("get", url, setMenu)
}

function setMenu(obj) {
  var txt ="";
  let menu = obj.map(function(item) {
   txt += "<div><b>" + item.title + "</b> <span>" + item.price + "</span>" +
          "<p>" + item.descr + "</p></div>";
  });

  element = document.querySelector("#menu");
  element.innerHTML = txt;
}
