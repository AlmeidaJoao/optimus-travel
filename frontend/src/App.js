import React, { Component } from 'react';
import WeatherInformation from './components/WeatherInformation';
import PopulationInformation from './components/PopulationInformation';
import ExchangeInformation from './components/ExchangeInformation';
import SearchBar from './components/SearchBar';
import LoginModal from './components/LoginModal';
import AccountCreationModal from './components/AccountCreationModal';
import axios from 'axios';

class TravelAssistantApp extends Component {
  constructor() {
    super();
    this.state = {
      searchResult: null,
      showCards: false,
      isLoggedIn: !!localStorage.getItem('token'),
      isLoginModalOpen: false,
      isAccountCreationModalOpen: false,
      email: '',
      token: localStorage.getItem('token') || '',
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');

    if (token && email) {
      this.setState({ isLoggedIn: true, email: email, token: token });
    }
  }

  handleSearch = (query) => {
    this.setState({
      searchResult: query,
      showCards: true,
    });
  };

  handleLoginClick = () => {
    this.setState({ isLoginModalOpen: true });
  };

  handleAccountCreationClick = () => {
    this.setState({ isAccountCreationModalOpen: true });
  };

  handleModalClose = () => {
    this.setState({ isLoginModalOpen: false, isAccountCreationModalOpen: false });
  };

  handleLoginSuccess = (user) => {
    const { email, token } = user;
    localStorage.setItem('token', token);
    localStorage.setItem('email', email);
    this.setState({ isLoggedIn: true, email: email, token: token });
  };

  handleLogout = () => {
    axios
      .post(`${process.env.REACT_APP_APIHOSTPORT}/users/logout`, null, {
        headers: { Authorization: `Bearer ${this.props.token}` },
      })
      .then(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        this.setState({ isLoggedIn: false, email: '', token: '' });
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });
  };

  render() {
    const { showCards, searchResult, isLoggedIn, isLoginModalOpen, isAccountCreationModalOpen, email, token } = this.state;
  
    return (
      <main role="main">
        <div className="jumbotron">
          <div className="container">
            <h1 className="display-3">Travel Assistant App</h1>
            Made with ❤ by Almeida de Almeida
            <div className="login">
              {isLoggedIn ? (
                <>
                  <p>Olá {email}</p>
                  <button onClick={this.handleLogout}>Logout</button>
                </>
              ) : (
                <>
                  <p>Please log in to access the app full features.</p>
                  <button onClick={this.handleLoginClick}>Login</button>
                  <button onClick={this.handleAccountCreationClick}>Create Account</button>
                </>
              )}
            </div>
          </div>
        </div>
  
        <div className="container">
          <div>
            <SearchBar onSearch={this.handleSearch} />
          </div>
          {showCards && (
            <div className="row">
              <div className="col-md-4">
                <WeatherInformation id="weather" searchResult={searchResult} token={token} />
              </div>
              {isLoggedIn && (
                <>
                  <div className="col-md-4">
                    <ExchangeInformation id="exchange" searchResult={searchResult} token={token} />
                  </div>
                  <div className="col-md-4">
                    <PopulationInformation id="population" searchResult={searchResult} token={token} />
                  </div>
                </>
              )}
            </div>
          )}
        </div>
  
        <LoginModal isOpen={isLoginModalOpen} onRequestClose={this.handleModalClose} onLoginSuccess={this.handleLoginSuccess} />
        <AccountCreationModal isOpen={isAccountCreationModalOpen} onRequestClose={this.handleModalClose} />
      </main>
    );
  }
}

export default TravelAssistantApp;
