import React, { Component } from 'react';
import Header from './components/Header/Header.js';
import Menu from './components/Menu/Menu.js';


class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Menu   />
      </div>
    );
  }
}

export default App;
