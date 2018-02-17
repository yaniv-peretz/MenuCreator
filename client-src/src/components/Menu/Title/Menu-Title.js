import React, { Component } from "react";
import EditableTitle from "./editableTitle";
import { observer } from "mobx-react";

@observer
class MenuTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleEditMode: false
    };
  }

  render() {
    const props = this.props
    const store = props.store;
    const resturantName = store.resturantName;
    return (
      <div className="rest-header">
        <h1 className="rest-title">
          {!this.props.editMode ? (
            resturantName
          ) : (
            <EditableTitle {...props}/>            
          )}
        </h1>

        {props.editMode && (
          <p>
            {"View you'r created menu at this"}
            <a href={`view-menu/?rest_id=${store.getId()}`} target="_blank">
              {` Link! `}
            </a>
          </p>
        )}
      </div>
    );
  }
}
export default MenuTitle;
