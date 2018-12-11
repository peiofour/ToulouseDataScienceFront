import React, { Component } from 'react';
import './App.css';
import Population from './components/Population';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class App extends Component {
  home(){
    return(
      <div>
        <p>Welcome</p>
      </div>
    )
  }
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <nav className="Nav">
              <ul className="Nav-list">
                <li className="Nav-item">
                  <Link classname="link" to="/">Home</Link>
                </li>
                <li className="Nav-item">
                  <Link className="link" to="/population">Population</Link>
                </li>
              </ul>
            </nav>
          </header>
          <main>
            <Route exact path="/" component={ this.home } />
            <Route path="/population" component={ Population } />
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
