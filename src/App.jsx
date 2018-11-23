import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Population from './components/population';



class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Population></Population>
        </header>
      </div>
    );
  }
}

export default App;
