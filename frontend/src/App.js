import React, { Component } from 'react';
import WeatherInformation from './components/WeatherInformation'
import PopulationInformation from './components/PopulationInformation';
import ExchangeInformation from './components/ExchangeInformation';
import SearchBar from './components/SearchBar';
import Login from './components/Login';
import Logout from './components/Logout';

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
      showCards: true,
      isLoggedIn: !!localStorage.getItem('token')
    })
  }

  render () {    

    const {showCards, searchResult, isLoggedIn  } = this.state

    return (

      
      <main role="main">

        <div class="jumbotron">
          <div class="container">
            <h1 class="display-3">Travel Assistant App</h1>
            Made with ❤ by Almeida de Almeida
          </div>
        </div>

        <div class="container">
{/* 
        <div className="top-right">
          {isLoggedIn ? (
            <Logout />
          ) : (
            <Login />
          )}
        </div> */}

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

export default TravelAssistantApp;