import React, { Component } from "react";
import { observer } from "mobx-react";
import { Edit } from "react-bytesize-icons";

@observer
class EditableTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleEditMode: false
    };
    this.toggleTitleEditMode.bind(this);
  }

  toggleTitleEditMode() {
    this.setState({ titleEditMode: !this.state.titleEditMode });
  }

  render() {
    const store = this.props.store;
    const titleEditMode = this.state.titleEditMode;

    return (
      <div>
        {/* show only in edit mode */}
        {titleEditMode && (
          <input
            onChange={event => store.updateResturantName(event.target.value)}
            value={store.resturantName}
          />
        )}

        {/* show only when not in edit mode */}
        {!titleEditMode && <span>{store.resturantName}</span>}
        <span
          onClick={() => {
            this.toggleTitleEditMode();
          }}
        >
          {` `} <Edit />
        </span>

        <br />
      </div>
    );
  }
}
export default EditableTitle;
