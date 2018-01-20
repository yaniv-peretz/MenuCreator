import React, { Component } from "react";
import { swal } from "sweetalert";

class MenuTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      id: "",
      resturantName: "",
      viewUrl: ""
    };
  }

  componentDidMount() {
    this.setState({edit: this.props.edit});
    this.getResturantName();
    if (this.state.edit) {
      this.setviewUrl();
    }
  }

  getResturantName() {
    let url = `/api/rest-name`;
    if (this.state.edit) {
      var current_url = new URL(window.location.href);
      var rest_id = current_url.searchParams.get("rest_id");
      url += "/"+rest_id;
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

  setviewUrl() {
    const url = `/api/login/rest_id/`;
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
          viewUrl: `/view-menu/?rest_id=${restId}`
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
            Link
            {" "}
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
