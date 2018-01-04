import React, { Component } from 'react';

class LogoutBox extends Component {
    render() {
        return (
            <div className="login-buttons">
                <form method="post" action='/api/login/out'> 
                    <input type="submit" value="LogOut" />
                </form>
            </div>
        );
    }
}

export default LogoutBox;