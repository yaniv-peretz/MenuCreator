import React, { Component } from 'react';
import ItemContect from './ItemContect.js';
import UserButtons from './UserButtons.js';

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showUserButtons: false,
      editMode: false
    };
    //this.state = {editMode: false};
    this.changeEditMode = this.changeEditMode.bind(this);
  }

  addItemHoverButtons(){
    let show = this.state.showUserButtons;
    if(!show)
      this.setState(previousState => {
        return { showUserButtons: true };
      });
  }

  removeItemHoverButtons(){
    //remove input field
    this.setState({
        editMode: false,
    });

    let show = this.state.showUserButtons;
    if(show)
      this.setState(previousState => {
        return { showUserButtons: false };
      });
  }

  changeEditMode(){
    this.setState(previousState => {
      return { editMode: !previousState.editMode };
    });
  }

  render() {
    let show = this.state.showUserButtons;
    return (
      <div
        className="Menu-Item-Container"
        onMouseEnter={() => this.addItemHoverButtons()}
        onMouseLeave={() => this.removeItemHoverButtons()}  >

        <ItemContect
          title     = {this.props.title}
          descr     = {this.props.descr}
          price     = {this.props.price}
          editMode  = {this.state.editMode}
          edit      = {this.props.edit}
          index     = {this.props.index}  />


        <UserButtons
          show    = {show}
          edit  = {this.changeEditMode}
          remove  = {this.props.remove}
          add  = {this.props.add}
          index = {this.props.index}  />

      </div>
    );
  }// end of render

}// end of Itme
export default Item;
