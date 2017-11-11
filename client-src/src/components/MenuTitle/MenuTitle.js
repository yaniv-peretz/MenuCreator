import React, { Component } from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom'
import '../../style/menuTitle.css'

class MenuTitle extends Component {
    constructor(props) {
        super(props);
        this.state = {
          resturantName: "",
          viewUrl: "http://localhost:8080/view-menu/"
        }

        }

    componentDidMount(){
      this.loadTitle();
      this.loadLink();
      
    }
    
    loadTitle(){
      let url ="http://localhost:8080/api/rest-name/";
      
      fetch(url, {credentials: 'same-origin' })
            .then(response => response.json())
            .then(json => {
              this.setState({resturantName: json});
    })

  }

  loadLink() {
    let url = "http://localhost:8080/api/login/rest_id";

    fetch(url, { credentials: 'same-origin' })
      .then(response => response.json())
      .then(json => {
        this.setState({ viewUrl: this.state.viewUrl+json });
      })
  }

  render() {

    return (
      <div className="rest-title">
        <h1>{this.state.resturantName}</h1>
        <Router>
          <Route exact path='/edit-menu'    render={() => (
            <div className="title-edit-items">
              <h3>edit your menu</h3> 
              <p>you can view the menu at <a href={this.state.viewUrl} target="_blank">Link</a></p>
            </div>
            
            )}/>
        </Router>
      </div>
    );
  }// end of render

}// end of MenuTitle
export default MenuTitle;
