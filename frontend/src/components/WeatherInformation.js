import React, { Component } from 'react';
import axios from 'axios';

class WeatherInformation extends Component {
  constructor() {
    super();

    this.state = {
      weatherData: null,
      loaded: false
    }
  }

  componentDidMount(prevProps) {
    this.fetchWeatherdata();

  }

  componentDidUpdate(prevProps) {
    if (this.props.searchResult !== prevProps.searchResult) {
      this.setState({ loaded: false })
      this.fetchWeatherdata();
    }
  }

  fetchWeatherdata() {
    const apiUrl = `${process.env.REACT_APP_APIHOSTPORT}/travel/weather?location=${this.props.searchResult}`;

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

  render() {
    const { weatherData, loaded } = this.state;
    if (!loaded) {
      return <div>Loading...</div>;
    }

    if (!weatherData) {
      return <div>No weather data available for this location.</div>;
    }
    const { temperature, pressure, humidity, wind_speed, description, icon } = weatherData['weather'][0];
    const { min_temp, max_temp, daily_description, daily_icon } = weatherData['weather'][1];
    const { placeName } = weatherData;

    return (
      <div class="card">
        <div class="card-body">
          <h2>{this.props.name}</h2>
          {/* <p><Vote id={this.props.id}/></p> */}
          <h5 class="card-title">Current weather 🌡️</h5>
          <p class="card-text"><b>Location name</b>: {placeName} </p>
          <p class="card-text"><b>Current temp.</b>: {temperature} ºC</p>
          <p class="card-text"><b>Current atmospheric pressure</b>: {pressure}</p>
          <p class="card-text"><b>Humidity</b>: {humidity}</p>
          <p class="card-text"><b>Wind Speed</b>: {wind_speed} m/s</p>
          <p class="card-text"><b>Description</b>: {description}</p>
          <div card="card text-bg-dark">
            <div class="card-body">
            <h5 class="card-title">Daily forecast🌞</h5>
              <p class="card-text"><b>Maximimum temperature</b>: {max_temp}ºC</p>
              <p class="card-text"><b>Minimum temperature</b>: {min_temp}ºC</p>
              <p class="card-text"><b>Description</b>: {daily_description}</p>
            </div>
          </div>
          {/* <p><img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="logo" class="center-block"/></p> */}


          <div class="container">
            <div class="row">
              <div class="col">
                <div class="parent">
                  <img src={`http://openweathermap.org/img/wn/${daily_icon}@2x.png`} alt="logo" class="center-block" />
                </div>
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