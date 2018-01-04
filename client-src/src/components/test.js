import React, { Component } from 'react';

class Test extends Component {
    testAjax() {

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
           document.getElementById("demo").innerHTML = this.responseText;
          }
        };
        // let url = 'http://localhost:8081/test'
        let url = '/test'
        xhttp.open("GET", url, true);
        xhttp.send();

    }
    render() {
        return (
            <div>
                <button onClick={()=>this.testAjax()}> clicks </button>
                <div id="demo"></div>
                sadasczxaaaaaaaaa
            </div>
        );
    }
}

export default Test;