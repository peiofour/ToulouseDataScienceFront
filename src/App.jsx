import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import Population from './components/Population';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom';

class App extends Component {
  home(){
    return(
      <div>
        <p>Welcome home</p>
      </div>
    )
  }
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/population">Population</Link>
              </li>
            </ul>
            <Route exact path="/" component={ this.home } />
            <Route path="/population" component={ Population } />
          </header>
        </div>
      </Router>
    );
  }
}

export default App;
