function receive(method, url, func) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      let obj = JSON.parse(this.responseText);
      func(obj);
    }
  };
  xhttp.open(method, url, true);
  xhttp.send();
}

function send(method, url, params) {
  var xhttp = new XMLHttpRequest();
  xhttp.open(method, url, true);
  xhttp.setRequestHeader("content-type", "application/json;charset=UTF-8");
  xhttp.send(params);
}

export default {receive,send}
