import React, { Component } from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom'
import '../../style/menuTitle.css'

class MenuTitle extends Component {
    constructor(props) {
        super(props);
        this.state = {
          resturantName: ""
        }

        }

    componentDidMount(){
      this.loadtitle();
      
    }
    
    loadtitle(){
      let url ="http://localhost:8080/api/rest-name/";

      if(window.location.pathname.includes("/view-menu/")){
        let id = window.location.pathname.substring("/view-menu".length + 1); 
        url += id 
      }
      
      fetch(url, {credentials: 'same-origin' })
            .then(response => response.json())
            .then(json => {
              this.setState({resturantName: json});
    })

  }

  render() {
    return (
      <div className="rest-title">
        <h1>{this.state.resturantName}</h1>
        <Router>
          <Route exact path='/edit-menu'    render={() => ( <h3>edit your menu</h3> )}/>
        </Router>
      </div>
    );
  }// end of render

}// end of MenuTitle
export default MenuTitle;
