import React, { Component } from 'react';
import axios from 'axios';

class WeatherInformation extends Component {
  constructor () {
    super();

    //configure the APIHOSTPORT, this is the public IP address of the host that the API server is running on
    this.APIHOSTPORT = `${process.env.REACT_APP_APIHOSTPORT}`;

    this.state = {
      weatherData: null,
      loaded: false
    }
  }

  componentDidMount (prevProps) {
    //provide implementation to request language details for current language from the API server
    // axios.get(`http://${this.APIHOSTPORT}/languages/${this.props.id}`).then(
    //   response => this.setState({
    //     language: response.data,
    //     loaded: true
    //   })
    // );
 
    this.fetchWeatherdata();
 
  }

  componentDidUpdate(prevProps) {
    if (this.props.searchResult !== prevProps.searchResult) {
      this.setState({ loaded: false})
      this.fetchWeatherdata();
    }
  }

  fetchWeatherdata() {
    const apiUrl = `http://localhost:3000/travel/weather?location=${this.props.searchResult}`;
    
    axios
    .get(apiUrl)
    .then((response) => {
      this.setState({
        weatherData: response.data,
        loaded: true
      });
    })
    .catch((error) => {
      console.error('Error fetching weather data:', error);
      this.setState({
        weatherData: null,
        loaded: true
      })
    })
  }

  render () {
    //provide implementation for the render function to render the HTML for the ProgrammingLanguage component
    // if (this.state.loaded) {
    //   var usecase = this.state.language.codedetail.usecase;
    //   var rank = this.state.language.codedetail.rank;
    //   var homepage = this.state.language.codedetail.homepage;
    const { weatherData, loaded } = this.state;
    if (!loaded) {
      return <div>Loading...</div>;
    }

    if (!weatherData) {
      return <div>No weather data available for this location.</div>;
    }
    const { temperature, pressure, humidity, wind_speed, description } = weatherData[0];
    const { min_temp, max_temp, daily_description } = weatherData[1];

      return (
        <div class="container">
          <h2>{this.props.name}</h2>
          {/* <p><Vote id={this.props.id}/></p> */}

          <p><b>Current temp.</b>: {temperature} </p>
          <p><b>Current atmospheric pressure</b>: {pressure}</p>
          <p><b>Humidity</b>: {humidity}</p>
          <p><b>Wind Speed</b>: {wind_speed}</p>
          <p><b>Description</b>: {description}</p>
          <p><b></b>------Entire Day-------</p>
          <p><b>Maximimum temperature</b>: {max_temp}</p>
          <p><b>Minimum temperature</b>: {min_temp}</p>
          <p><b>Rest of the day</b>: {daily_description}</p>

          
          <div class="container">
            <div class="row">
              <div class="col">
                <div class="parent">
                  <img src alt="logo" class="center-block"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    // }
  }
}

//export the ProgrammingLanguage class, allows the VoteApp component to import it
export default WeatherInformation;