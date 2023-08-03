import React, { Component } from 'react';
import axios from 'axios';

class ExchangeInformation extends Component {
  constructor () {
    super();

    this.state = {
      language: {},
      loaded: false
    }
  }

  componentDidMount () {
    this.fetchExchangeData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.searchResult !== prevProps.searchResult) {
      this.setState({ loaded: false})
      this.fetchExchangeData();
    }
  }


  fetchExchangeData() {
    const apiUrl = `${process.env.REACT_APP_APIHOSTPORT}/travel/exchange?location=${this.props.searchResult}`;

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
    const { exchangeData, loaded } = this.state;
    if (!loaded) {
      return <div>Loading...</div>;
    }

    if (!exchangeData) {
      return <div>No Exchange data available for this location.</div>;
    }
    const {base, rates} = exchangeData;
      return (
        <div class="container">
          <h2>{this.props.name}</h2>

          <p><b>Base Currency</b>: {base}</p>
          <p><b>Exchange Rates</b>:</p>
          <ul>
            {Object.entries(rates).map(([currency, rate]) => (
              <li key={currency}>
                <b>{currency}</b>: {rate}
              </li>
            ))}
          </ul>

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

export default ExchangeInformation;