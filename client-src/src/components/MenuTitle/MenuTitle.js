import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import '../../style/menuTitle.css'

class MenuTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resturantName: "",
      viewUrl: ""
    }
  }

  componentDidMount() {
    var id = "";
    var currentUrl = document.location.toString();
    let view = currentUrl.includes('view-menu');
    if(view){
      var id = document.location.toString().indexOf('u/')
      id = currentUrl.substring(id + 2);
    }

    if(!view){
      this.loadLink();
    }
    this.loadTitle(id);

  }

  loadTitle(id) {
    let restName = new Promise((resolve, reject) => {
      let url = `/api/rest-name/${id}`;
      console.log(url)
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.onload = () => {
        if (xhr.status == 200) {
          resolve(xhr.responseText);
        } else {
          reject()
        }
      }
      xhr.onerror = () => {reject() };
      xhr.send();
    });

    var menu = this;
    restName.then((responseText) => {
      menu.setState({ resturantName: responseText })
    }, (status) => {
      alert(`cannot get rest name`)
    })
  }

  loadLink() {    
    let rest_id = new Promise((resolve, reject) => {
      let url = `/api/login/rest_id/`;
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.onload = () => {
        if (xhr.status == 200) {
          resolve(xhr.responseText);
        } else {
          reject()
        }
      }
      xhr.onerror = () => {reject() };
      xhr.send();
    });

    var menu = this;
    rest_id.then((id)=>{
      menu.setState({viewUrl: `/view-menu/${id}`});
      // this.setState({viewUrl: `www.google.com`});
    },()=>{
      alert('cannot set view url');
    });
  }

  render() {

        return(
      <div className = "rest-title" >
            <h1>{this.state.resturantName}</h1>
            <Router>
              <Route exact path='/edit-menu' render={() => (
                <div className="title-edit-items">
                  <h3>edit your menu</h3>
                  <p>you can view the menu at <a href={this.state.viewUrl} target="_blank">Link</a></p>
                </div>

              )} />
            </Router>

      </div >
    );
  }// end of render

}// end of MenuTitle
export default MenuTitle;
