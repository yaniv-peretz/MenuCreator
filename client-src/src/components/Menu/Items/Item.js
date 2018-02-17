import React, { Component } from "react";
import ItemContect from "./ItemContect.js";
import UserButtons from "./UserButtons.js";
import { observer } from "mobx-react";

@observer
export default class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showUserButtons: false,
      itemEditMode: false
    };
    this.toggleEditMode = this.toggleEditMode.bind(this);
    this.addContolButtons = this.addContolButtons.bind(this);
    this.removeControlButtons = this.removeControlButtons.bind(this);
  }

  addContolButtons() {
    this.setState({ showUserButtons: true });
  }

  removeControlButtons() {
    this.setState({
      showUserButtons: false,
      itemEditMode: false
    });
  }

  toggleEditMode() {
    this.setState({ itemEditMode: !this.state.itemEditMode });
  }

  render() {
    const props = this.props;
    const state = this.state;
    return (
      <div
        className="Menu-Item-Container"
        onMouseEnter={() => this.addContolButtons()}
        onMouseLeave={() => this.removeControlButtons()}
      >
        <ItemContect {...props} itemEditMode={state.itemEditMode} />

        {props.editMode && (
          <UserButtons
            {...props}
            show={state.showUserButtons}
            toggleEditMode={this.toggleEditMode}
          />
        )}
      </div>
    );
  }
}
