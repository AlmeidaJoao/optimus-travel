import React, { Component } from 'react';
import axios from 'axios';

class PopulationInformation extends Component {
  constructor () {
    super();

    this.state = {
      populationData: null,
      loaded: false
    }
  }

  componentDidMount () {
    this.fetchPopulationData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.searchResult !== prevProps.searchResult) {
      this.setState({ loaded: false})
      this.fetchPopulationData();
    }
  }


  fetchPopulationData() {
    const apiUrl = `${process.env.REACT_APP_APIHOSTPORT}/travel/population?location=${this.props.searchResult}`;

    axios
      .get(apiUrl)
      .then((response) => {
        this.setState({
          populationData: response.data,
          loaded: true,
        });
      })
      .catch((error) => {
        console.error('Error fetching population data:', error);
        this.setState({
          populationData: null,
          loaded: true,
        });
      }); 
  }

  render () {
    const { populationData, loaded } = this.state;
    if (!loaded) {
      return <div>Loading...</div>;
    }

    if (!populationData) {
      return <div>No Population data available for this location.</div>;
    }
    const { population, gdp } = populationData
      return (
        <div class="container">
          <h2>{this.props.name}</h2>

          <p><b>Population</b>: {population}</p>
          <p><b>GDP</b>: {gdp}</p>
          
          <div class="container">
            <div class="row">
              <div class="col">
                <div class="parent">
                  {/* <img src alt="logo" class="center-block"/> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    // }
  }
}

export default PopulationInformation;