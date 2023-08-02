import React, { Component } from 'react';
import WeatherInformation from './components/WeatherInformation'
import PopulationInformation from './components/PopulationInformation';
import ExchangeInformation from './components/ExchangeInformation';
import SearchBar from './components/SearchBar';

class TravelAssistantApp extends Component {

  constructor() {
    super();
    this.state = {
      searchResult: null,
      showCards: false
    }
  }

  handleSearch = (query) => {
    this.setState({
      searchResult: query,
      showCards: true
    })
  }

  render () {    

    const {showCards, searchResult } = this.state

    return (
      <main role="main">
        <div class="jumbotron">
          <div class="container">
            <h1 class="display-3">Travel Assistant App</h1>
            Made with ❤ by Almeida de Almeida
          </div>
        </div>

        <div class="container">

          <div>
            <SearchBar onSearch={this.handleSearch}/>
          </div>
          {showCards && (
                     <div class="row">
                     <div class="col-md-4">
                       <WeatherInformation id="weather" searchResult={searchResult}/>
                     </div>
         
                     <div class="col-md-4">
                       <ExchangeInformation id="exchange" searchResult={searchResult}/>
                     </div>
                     <div class="col-md-4">
                       <PopulationInformation id="population" searchResult={searchResult}/>
                     </div>
                   </div> 
          )}

        </div>
      </main>
    )
  }
}

//Cexport the VoteApp class, allows the ReactDOM.render within the index.js file to use it
export default TravelAssistantApp;