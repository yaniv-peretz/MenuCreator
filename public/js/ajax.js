function ajax(method, url, func) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let obj = JSON.parse(this.responseText);
      func(obj);
    }
  };
  xhttp.open(method, url, true);
  xhttp.send();
}

function ajaxSend(method, url, params) {
  var xhttp = new XMLHttpRequest();
  xhttp.open(method, url, true);
  xhttp.setRequestHeader("content-type", "application/json;charset=UTF-8");
  xhttp.send(params);
}


function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
