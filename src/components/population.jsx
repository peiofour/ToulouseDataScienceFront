import React, { Component } from 'react';
import axios from 'axios';

export default class Population extends Component {
  constructor(props){
    super(props);
    this.state = {
      test: []
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    axios.get('https://datascience-tls.scalingo.io/population')
      .then(response => this.setState({test: response.data}))
  }

  ListCities(){
    const list = this.state.test.map((quartier)=> <li>{quartier.Quartier}</li>)
    return list;
  }

  render(){
    return(
      <div className="button-container">
        <button className="button" onClick={this.handleClick}>
          Clique
        </button>
        <ul>
          {this.ListCities()}
        </ul>
      </div>
    )
  }
}
