import React, { Component } from "react";

class LogoutBox extends Component {
  logOutUser() {
    //Log Out user promise
    const url = "api/login/";
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", url, true);
    xhr.send();
    window.location = "/";
  }

  render() {
    return (
      <button
        type="button"
        className="btn btn-outline-secondary bg-light"
        onClick={() => this.logOutUser()}
      >
        Log Out
      </button>
    );
  }
}

export default LogoutBox;
