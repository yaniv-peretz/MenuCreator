checkAuth();

function checkAuth() {

  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      let obj = JSON.parse(this.responseText);
        if(obj !== true){
        window.location.replace('index.html')
        }
    };

    let url ="http://localhost:8080/api/login/check";
    xhttp.open("get", url, true);
    xhttp.send();
  }

}
