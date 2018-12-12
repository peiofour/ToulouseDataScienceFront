import React, { Component } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

export default class Population extends Component {
  constructor(props){
    super(props);
    this.state = {
      populationMoyenne: [],
      quartiers: []
    }
    this.PopMoyQuartierClick = this.PopMoyQuartierClick.bind(this);
  }

  PopMoyQuartierClick() {
    axios.get('https://datascience-tls.scalingo.io/population')
      .then(response => {
        this.setState({
          populationMoyenne : response.data.map(foo => foo.MoyennePop),
          quartiers : response.data.map(bar => bar.Quartier)
        })
      })
  }


  render(){
    const data = {
      labels: this.state.quartiers,
      datasets: [
        {
          label: 'Population moyenne par quartier',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 0.5,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: this.state.populationMoyenne
        }
      ]
    };

    return(
      <div className="button-container">
        <button className="button" onClick={this.PopMoyQuartierClick}>
          Clique
        </button>
          <Bar 
            data={ data } 
            height= {500}
            options=
            {{
              maintainAspectRatio: false
              }}
          />
      </div>
    )
  }
}
