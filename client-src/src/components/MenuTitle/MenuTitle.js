import React, { Component } from "react";
import { swal } from "sweetalert";

class MenuTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: this.props.edit,
      id: "",
      resturantName: "",
      viewUrl: "/view-menu/"
    };
  }

  componentDidMount() {
    this.getResturantName();
    if (this.state.edit) {
      this.getviewUrl();
    }
  }

  getResturantName() {
    let url = `/api/rest-name/`;
    if (!this.state.edit) {
      let id = document.location.toString().substring(32);
      url += id;
    }

    const restName = new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.onload = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr.responseText);
          } else {
            reject();
          }
        }
      };
      xhr.onerror = () => {
        reject();
      };
      xhr.send();
    });

    var menu = this;
    restName.then(
      restName => {
        menu.setState({ resturantName: restName });
      },
      () => {
        swal(
          "Getting resturant name failed",
          "cannot set resurant name",
          "fail"
        );
      }
    );
  }

  getviewUrl() {
    const id = document.location.toString().substring(32);
    const url = `/api/login/rest_id/${id}`;

    const restId = new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.onload = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr.responseText);
          } else {
            reject();
          }
        }
      };
      xhr.onerror = () => {
        reject();
      };
      xhr.send();
    });

    const menu = this;
    restId.then(
      restId => {
        menu.setState({
          id: restId,
          viewUrl: `/view-menu/${restId}`
        });
      },
      () => {
        swal("Getting resturant id failed", "cannot set view url", "fail");
      }
    );
  }

  render() {
    var viewMenuMsg = <p />;
    if (this.state.edit) {
      viewMenuMsg = (
        <p>
          View you'r created menu at this
          <a href={this.state.viewUrl} target="_blank">
            {" "}
            Link{" "}
          </a>
          !
        </p>
      );
    }
    return (
      <div className="rest-header">
        <h1 className="rest-title">{this.state.resturantName}</h1>
        {viewMenuMsg}
      </div>
    );
  } // end of render
} // end of MenuTitle
export default MenuTitle;
