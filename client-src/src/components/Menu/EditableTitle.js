import React, { Component } from "react";

class EditableTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resturantName: '',
      editMode: false
    }
    this.changeRestName = this.changeRestName.bind(this);
    this.toggleEditMode = this.toggleEditMode.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      resturantName: nextProps.resturantName
    });
  }

  changeRestName(e) {
    this.setState({
      resturantName: e.target.value
    });
  }

  toggleEditMode() {
    let newState = !this.state.editMode;
    this.setState({ editMode: newState });
    if (!newState) {
      this.props.updateRestName(this.state.resturantName);
    }
  }

  render() {
    let editMode = this.state.editMode;
    return (
      <span>
        {editMode && (<input value={this.state.resturantName} onChange={this.changeRestName} />)}
        {!editMode && this.state.resturantName}
        <img onClick={this.toggleEditMode}
          src={require("../../../node_modules/bytesize-icons/dist/icons/edit.svg")}
          className="icon icon-hover"
        />
      </span>
    );
  }
}
export default EditableTitle;
