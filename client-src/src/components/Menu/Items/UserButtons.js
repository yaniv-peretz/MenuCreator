import React, { Component } from "react";
import { observer } from "mobx-react";

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
            className="add-button"
            onClick={() => store.addItem(this.props.index)}
          />
          <button
            type="button"
            className="edit-button"
            onClick={() => this.props.toggleEditMode()}
          />
          <button
            type="button"
            className="remove-button"
            onClick={() => store.deleteItem(props.id, props.index)}
          />
        </div>
      );
    } else {
      return <div />;
    }
  }
}
export default UserButtons;
