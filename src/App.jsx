import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Population from './components/population';



class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <select>
            <option value='foo'>Foo</option>
            <option value='bar'>Bar</option>
          </select>
          <Population />
        </header>
      </div>
    );
  }
}

export default App;
