import React, { Component } from "react";
import swal from "sweetalert";
import axios from "axios";

class LoginBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usr: "",
      psw: ""
    };

    this.handleChangeUsr = this.handleChangeUsr.bind(this);
    this.handleChangePsw = this.handleChangePsw.bind(this);
  }

  handleChangeUsr(event) {
    this.setState({ usr: event.target.value });
  }

  handleChangePsw(event) {
    this.setState({ psw: event.target.value });
  }

  login() {
    if (!this.validateForm()) {
      return;
    }

    const credentials = {
      email: this.state.usr,
      password: this.state.psw
    };
    // login
    const login = new Promise((resolve, reject) => {
      const url = "api/login/";
      const xhr = new XMLHttpRequest();
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve();
        } else {
          reject();
        }
      };
      xhr.onerror = () => reject();
      xhr.send(JSON.stringify(credentials));
    });

    login.then(
      response => {
        window.location = "/edit-menu";
      },
      response => {
        swal(
          "Cannot Login!",
          "user and password combination not exists",
          "error"
        );
      }
    );
  }

  createNewUser() {
    if (!this.validateForm()) {
      return;
    }

    // create new user
    const credentials = {
      email: this.state.usr,
      password: this.state.psw
    };
    const url = "api/login/reg";
    axios.post(url, credentials).then(
      response => {
        swal(
          "New User Created!",
          `new user ${credentials.email} was created successfully.`,
          "success"
        );
      },
      response => {
        swal(
          "User Not Created!",
          `probably user name already exists for: ${
            credentials.email
          } try a diffrent user name.`,
          "error"
        );
      }
    );
  }

  validateForm() {
    if (this.state.usr === "" || this.state.psw === "") {
      swal("Missing username or password", ``, "info");
      return false;
    } else {
      return true;
    }
  }

  render() {
    return (
      <form className="form-inline my-2 my-lg-0">
        <div className="input-group mb-3">
          <input
            required
            className="form-control mr-sm-2"
            id="email"
            name="email"
            placeholder="user name"
            value={this.state.usr}
            onChange={this.handleChangeUsr}
          />
          <input
            required
            className="form-control"
            id="password"
            name="password"
            type="password"
            placeholder="password"
            value={this.state.psw}
            onChange={this.handleChangePsw}
          />
          <button
            type="button"
            className="btn btn-outline-primary bg-light"
            onClick={() => this.login()}
          >
            {"Log in"}
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary bg-light"
            onClick={() => this.createNewUser()}
          >
            Sign In
          </button>
        </div>
      </form>
    );
  }
}

export default LoginBox;
