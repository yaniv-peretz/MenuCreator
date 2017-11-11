import React, { Component } from 'react';
import '../../style/landing-page.css';

class LandingPage extends Component {
    render() {
        return (
            <div className="landing-page">
                <h3>Welcome to Menu Creator</h3>
                <p>Menu Creator make it easy for you to create a new resturant menu amd upload it on line</p>
                <p>you can login are create a new user via the SignIn button</p>

            </div>
        );
    }
}

export default LandingPage;