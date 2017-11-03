import React, { Component } from 'react';

class UserButtons extends Component {

  render() {
    let show = this.props.show;

    if(show){
      return (
        <div className="User-Buttons">
          <button type="button" className="edit-button" onClick={() => this.props.edit()}/>
          <button type="button" className="add-button" onClick={() => this.props.add(this.props.index)}/>
          <button type="button" className="remove-button" onClick={() => this.props.remove(this.props.index)}/>
        </div>
      );
    }else {
      return(
        <div></div>
      );
    }
  }
}
export default UserButtons;
