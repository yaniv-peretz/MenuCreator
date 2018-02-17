import React, { Component } from "react";
import { observer } from "mobx-react";
import { Edit, Trash, Plus } from "react-bytesize-icons";

@observer
class UserButtons extends Component {
  render() {
    const props = this.props;
    const store = props.store;
    if (props.show) {
      return (
        <div className="User-Buttons">
          <button
            type="button"
            className="btn btn-success"
            onClick={() => store.addItem(this.props.index)}
          >
            <span className="inner-icon">
              <Plus width={"100%"} height={"100%"} />
            </span>
          </button>

          <button
            type="button"
            className="btn btn-warning "
            onClick={() => this.props.toggleEditMode()}
          >
            <span className="inner-icon">
              <Edit width={"100%"} height={"100%"} />
            </span>
          </button>
          <button
            type="button"
            className="btn btn-danger "
            onClick={() => store.deleteItem(props.id, props.index)}
          >
            <span className="inner-icon">
              <Trash width={"100%"} height={"100%"} />
            </span>
          </button>
        </div>
      );
    } else {
      return <div />;
    }
  }
}
export default UserButtons;
