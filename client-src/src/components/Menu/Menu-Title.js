import React, { Component } from "react";
import { swal } from "sweetalert";
import EditableTitle from "./EditableTitle";

class MenuTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: this.props.editMode,
      id: "",
      resturantName: "",
      restNameEditMode: false,
      viewUrl: ""
    };

    this.updateRestName = this.updateRestName.bind(this);
  }

  componentDidMount() {
    this.getResturantName();
    if (this.props.editMode) {
      this.setviewUrl();
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      editMode: nextProps.editMode,
    });
  }

  getResturantName() {
    let url = `/api/rest-name`;
    if (!this.state.editMode) {
      var current_url = new URL(window.location.href);
      var rest_id = current_url.searchParams.get("rest_id");
      url += `/${rest_id}`;
    }

    const restName = new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.onload = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr.responseText);
          } else {
            reject(xhr.status);
          }
        }
      };
      xhr.send();
    });

    let menu = this;
    restName
      .then(responseRestName => {
        menu.setState({
          resturantName: responseRestName
        });
      }).catch(status => {
        swal(
          "Getting Resturant Name failed!",
          `cannot set the resurant name, failed with status: ${status}`,
          "fail"
        );
      });

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
            reject(xhr.status);
          }
        }
      };
      xhr.send();
    });

    const menu = this;
    restId
      .then(restId => {
        menu.setState({
          id: restId,
          viewUrl: `/view-menu/?rest_id=${restId}`
        });
      })
      .catch(status => {
        swal("Getting Resturant Id Failed!",
          `getting resturant id failed with status ${status}`,
          "fail");
      });

  }

  updateRestName(newRestName) {
    const url = `/api/rest-name/`;
    const updateRestName = new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("PUT", url, true);
      xhr.onload = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve();
          } else {
            reject(xhr.status);
          }
        }
      };
      xhr.setRequestHeader("Content-type", "application/json");
      let rest_name = { rest_name: newRestName }
      xhr.send(JSON.stringify(rest_name));
    });

    updateRestName
      .catch(() => { alert('something went wrong') });
  }

  render() {
    return (
      <div className="rest-header">
        <h1 className="rest-title">
          {!this.state.editMode && this.state.resturantName}
          {this.state.editMode && <EditableTitle
            resturantName={this.state.resturantName}
            updateRestName={this.updateRestName} />}
        </h1>

        {/* Only show the bollow message in edit mode */}
        {this.state.editMode && (
          <p>
            View you'r created menu at this
            <a href={this.state.viewUrl} target="_blank"> Link</a>!</p>
        )}
      </div>
    );
  }
}
export default MenuTitle;
