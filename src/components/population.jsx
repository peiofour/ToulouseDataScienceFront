import React, { Component } from 'react';
import axios from 'axios';

export default class Population extends Component {
  constructor(props){
    super(props);
    this.state = {
      testName: ""
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    axios.get('https://datascience-tls.scalingo.io/population')
      .then(response => this.setState({testName: response.data[0].Quartier}))
  }

  render(){
    return(
      <div className="button-container">
        <button className="button" onClick={this.handleClick}>
          Clique
        </button>
        <p>{this.state.testName}</p>
      </div>
    )
  }
}
