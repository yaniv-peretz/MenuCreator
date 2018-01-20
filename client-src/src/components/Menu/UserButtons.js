import React, { Component } from "react";

class UserButtons extends Component {
  render() {
    if (this.props.show) {
      return (
        <div className="User-Buttons">
          <button
            type="button"
            className="add-button"
            onClick={() => this.props.add(this.props.index)}
          />
          <button
            type="button"
            className="edit-button"
            onClick={() => this.props.toggleEditMode()}
          />
          <button
            type="button"
            className="remove-button"
            onClick={() => this.props.remove(this.props.id, this.props.index)}
          />
        </div>
      );
    } else {
      return <div />;
    }
  }
}
export default UserButtons;
