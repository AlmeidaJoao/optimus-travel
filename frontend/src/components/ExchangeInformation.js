import React, { Component } from 'react';
import axios from 'axios';

class ExchangeInformation extends Component {
  constructor () {
    super();

    //configure the APIHOSTPORT, this is the public IP address of the host that the API server is running on
    this.APIHOSTPORT = `${process.env.REACT_APP_APIHOSTPORT}`;

    this.state = {
      language: {},
      loaded: false
    }
  }

  componentDidMount () {
    //provide implementation to request language details for current language from the API server
    // axios.get(`http://${this.APIHOSTPORT}/languages/${this.props.id}`).then(
    //   response => this.setState({
    //     language: response.data,
    //     loaded: true
    //   })
    // );
    this.fetchExchangeData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.searchResult !== prevProps.searchResult) {
      this.setState({ loaded: false})
      this.fetchExchangeData();
    }
  }


  fetchExchangeData() {
    const apiUrl = `http://localhost:3000/travel/exchange?location=${this.props.searchResult}`;

    axios
      .get(apiUrl)
      .then((response) => {
        this.setState({
          exchangeData: response.data,
          loaded: true,
        });
      })
      .catch((error) => {
        console.error('Error fetching exchange data:', error);
        this.setState({
          exchangeData: null,
          loaded: true,
        });
      });
  }


  render () {
    //provide implementation for the render function to render the HTML for the ProgrammingLanguage component
    // if (this.state.loaded) {
    //   var usecase = this.state.language.codedetail.usecase;
    //   var rank = this.state.language.codedetail.rank;
    //   var homepage = this.state.language.codedetail.homepage;
    const { exchangeData, loaded } = this.state;
    if (!loaded) {
      return <div>Loading...</div>;
    }

    if (!exchangeData) {
      return <div>No weather data available for this location.</div>;
    }
    const {base} = exchangeData;
      return (
        <div class="container">
          <h2>{this.props.name}</h2>
          {/* <p><Vote id={this.props.id}/></p> */}

          <p><b>Current temp.</b>: {base}</p>
          <p><b>Current atmospheric pressure</b>: Almeida</p>
          <p><b>Humidity</b>: Almeida</p>
          <p><b>Wind Speed</b>: Almeida</p>
          <p><b>Description</b>: Almeida</p>

          
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
export default ExchangeInformation;