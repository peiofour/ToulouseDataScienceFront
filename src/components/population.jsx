import React, { Component } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

export default class Population extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Population_year: [],
      Logement_year: [],
      populationMoyenne: [],
      quartiersMoy: [],
      year: '2011',
    };
    this.MyOptions = this.MyOptions.bind(this);
    this.PopMoyQuartierClick = this.PopMoyQuartierClick.bind(this);
    this.PopYearChange = this.PopYearChange.bind(this);
    this.PopYearSubmit = this.PopYearSubmit.bind(this);
    this.dataPopMoy = {
      labels: this.state.quartiersMoy,
      datasets: [
        {
          label: 'Population moyenne par quartier',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 0.5,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: this.state.populationMoyenne,
        },
      ],
    };

    this.dataPopbyYear = {
      labels: this.state.Population_year.map(res => res.quartier),
      datasets: [
        {
          label: 'Population par quartier',
          backgroundColor: '#ff6666',
          borderColor: '#ff0000',
          borderWidth: 1,
          hoverBackgroundColor: '#ff3333',
          hoverBorderColor: '#cc0000',
          data: this.state.Population_year.map(res => res.population),
        },
        {
          label: 'Nombre de logement par quartier',
          backgroundColor: '#66a3ff',
          borderColor: '#0066ff',
          borderWidth: 1,
          hoverBackgroundColor: '#3385ff',
          hoverBorderColor: '#0052cc',
          data: this.state.Logement_year.map(res => res.logement),
        },
      ],
    };
  }

  PopMoyQuartierClick(event) {
    axios.get('https://datascience-tls.scalingo.io/population')
      .then((response) => {
        this.setState({
          populationMoyenne: response.data.map(foo => foo.MoyennePop),
          quartiersMoy: response.data.map(bar => bar.Quartier),
        });
      });
    event.preventDefault();
  }

  PopYearChange(event) {
    this.setState({ year: event.target.value });
  }

  PopYearSubmit(event) {
    axios.get(`https://datascience-tls.scalingo.io/population-year?year=${this.state.year}`)
      .then((response) => {
        this.setState({
          Population_year: (response.data.map(res => ({ quartier: res.quartier, population: res.population }))).sort((a, b) => (a.quartier).localeCompare(b.quartier))
        });
      });
    axios.get(`https://datascience-tls.scalingo.io/logement-year?year=${this.state.year}`)
      .then(response => {
        this.setState({
          Logement_year: (response.data.map(res => ({quartier: res.quartier, nblogement: res.nblogement }))).sort((a, b) => (a.quartier).localeCompare(b.quartier))
        });
      });
    event.preventDefault();
  }

  MyOptions(firstYear, nbYears){
    let rows = [];
    for (let year = 0; year < nbYears; year++){
      rows.push(<option value={year + firstYear}>{year + firstYear}</option>)
    }
    return <select value={this.state.value} onChange={this.PopYearChange}>{rows}</select>
  }

  render() {
    

    return (
      <div>
        <div>
          <form onSubmit={this.PopYearSubmit}>
            <label>
              {this.MyOptions(2011, 4)}
            </label>
            <input type="submit" value="Submit" />
          </form>
          <Bar
            data={this.dataPopbyYear}
            height={600}
            options={{
              maintainAspectRatio: false,
            }}
          />
        </div>

        <div className="button-container">
          <button type="button" className="button" onClick={this.PopMoyQuartierClick}>
            Clique
          </button>
          <Bar
            data={this.dataPopMoy}
            height={500}
            options={{
              maintainAspectRatio: false,
            }}
          />
        </div>
      </div>
    );
  }
}
