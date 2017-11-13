var port;
if(window.location.host.includes('3000')){
    port = 3000
}else{
    port = 8080
}

export default port;