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
    const { weatherData, loaded } = this.state;
    if (!loaded) {
      return <div>Loading...</div>;
    }

    if (!weatherData) {
      return <div>No weather data available for this location.</div>;
    }
    const { temperature, pressure, humidity, wind_speed, description, icon } = weatherData[0];
    const { min_temp, max_temp, daily_description, daily_icon } = weatherData[1];

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
                  <img src={`http://openweathermap.org/img/wn/${daily_icon}@2x.png`} alt="logo" class="center-block"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    // }
  }
}

export default WeatherInformation;