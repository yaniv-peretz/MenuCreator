import React, { Component } from "react";
import ItemContect from "./ItemContect.js";
import UserButtons from "./UserButtons.js";

export default class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showUserButtons: false,
      editMode: false
    };
    this.toggleEditMode = this.toggleEditMode.bind(this);
  }

  addItemHoverButtons() {
    let show = this.state.showUserButtons;
    if (!show) {
      this.setState({ showUserButtons: true });
    }
  }

  removeItemHoverButtons() {
    //remove input field
    this.setState({
      editMode: false
    });

    let show = this.state.showUserButtons;
    if (show) {
      this.setState({ showUserButtons: false });
    }
  }

  toggleEditMode() {
    let next = this.state.editMode;
    this.setState({ editMode: !next });
  }

  render() {
    let show = this.state.showUserButtons;
    return (
      <div
        className="Menu-Item-Container"
        onMouseEnter={() => this.addItemHoverButtons()}
        onMouseLeave={() => this.removeItemHoverButtons()}
      >
        <ItemContect
          title={this.props.title}
          item_id={this.props.item_id}
          seq={this.props.seq}
          descr={this.props.descr}
          price={this.props.price}
          editMode={this.state.editMode}
          edit={this.props.edit}
          index={this.props.index}
        />

        <UserButtons
          show={show}
          // key={this.props.key}
          index={this.props.index}
          seq={this.props.seq}
          toggleEditMode={this.toggleEditMode}
          remove={this.props.remove}
          add={this.props.add}
        />
      </div>
    );
  }
}
