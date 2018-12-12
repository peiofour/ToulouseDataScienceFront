import React, { Component } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

export default class Population extends Component {
  constructor(props){
    super(props);
    this.state = {
      populationMoyenne: [],
      quartiersMoy: [],
      quartiersTend: [],
      tendancePopYear: [],
      year: "2011"
    }
    this.PopMoyQuartierClick = this.PopMoyQuartierClick.bind(this);
    this.PopYearChange = this.PopYearChange.bind(this);
    this.PopYearSubmit = this.PopYearSubmit.bind(this);
  }

  PopMoyQuartierClick(event) {
    axios.get('https://datascience-tls.scalingo.io/population')
      .then(response => {
        this.setState({
          populationMoyenne : response.data.map(foo => foo.MoyennePop),
          quartiersMoy : response.data.map(bar => bar.Quartier)
        })
      })
    event.preventDefault();
  }

  PopYearChange(event) {
    this.setState({year: event.target.value})
  }

  PopYearSubmit(event){
    axios.get(`https://datascience-tls.scalingo.io/population-year?year=${this.state.year}`)
    .then(response => {
      this.setState({
        tendancePopYear : response.data.map(res => res.population),
        quartiersTend : response.data.map(res => res.quartier)
      })
    })
    event.preventDefault();
  }

  render(){
    let dataPopMoy = {
      labels: this.state.quartiersMoy,
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

    let dataPopTend = {
      labels: this.state.quartiersTend,
      datasets: [
        {
          label: 'Population moyenne par quartier',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 0.5,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: this.state.tendancePopYear
        }
      ]
    }

    return(
      <div>
      
        <div className="button-container">
        <button className="button" onClick={this.PopMoyQuartierClick}>
          Clique
        </button>
        <Bar 
          data={dataPopMoy} 
          height= {500}
          options=
          {{
            maintainAspectRatio: false
            }}
        />
        </div>

        <div>
            <form onSubmit={this.PopYearSubmit}>
              <label>
                Choisir l'année : 
                <select value={this.state.value} onChange={this.PopYearChange}>
                  <option value="2011">2011</option>
                  <option value="2012">2012</option>
                  <option value="2013">2013</option>
                  <option value="2014">2014</option>
                </select>
              </label>
              <input type="submit" value="Submit" />
            </form>
            <Bar 
            data={dataPopTend} 
            height= {500}
            options=
            {{
              maintainAspectRatio: false
              }}
          />
        </div>
      </div>
    )
  }
}
