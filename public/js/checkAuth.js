checkAuth();

function checkAuth() {
  let url ="http://localhost:8080/api/login/check";
  ajax("get", url, redirectUnAuth)
}

function redirectUnAuth(obj) {
  if(obj != true){
    window.location.replace('index.html')
  }

}
