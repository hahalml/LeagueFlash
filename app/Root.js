import React, { Component } from 'react';
import { APIKey, playerID } from './utils/helper';
import './app.global.css';
import App from './App';

class Root extends Component {
  constructor() {
    super();
    this.state = { playerID, APIKey, launched: false };
    this.start = this.start.bind(this);
    this.fetchGame = this.fetchGame.bind(this);
    this.renderApp = this.renderApp.bind(this);
    this.reset = this.reset.bind(this);
  }
  // Function to retrieve the data for the game from the Riot API
  fetchGame() {
    const rawData = fetch('https://euw.api.pvp.net/observer-mode/rest/consumer/getSpectatorGameInfo/EUW1/'
      + playerID + '?api_key=' + APIKey)
    const data = rawData.then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    });
    data.then((data) => {
        this.setState({ data });
      });
    data.catch((err) => {
      console.log(err);
      this.setState({
        error: err
      });
    });
  }
  // Route the user towards the App Page (Wich will display a spinning loader until
  // the fetch is completed)
  start() {
    // Set launched to true so that in render it stops displaying the button and displays
    // <App /> insted
    this.setState({ launched: true });
    // Call to our fetching function (above this)
    this.fetchGame();
  }
  reset() {
    this.setState({ launched: false, error: false, data: null });
  }
  // render the starting screen (One button)
  renderHome() {
    return (
        <button className="launch-button" onClick={this.start}>
          START FLASH
        </button>
    );
  }
  // What is displayed when you click the green Start button
  renderApp() {
    // TODO: Adjust the window size
    if (this.state.error) {
      return (
        <div className="error-div">
          <p className="error-text">Error! <br />{this.state.error.message}</p>
          <button className="launch-button" onClick={this.reset}>RESET</button>
        </div>
      );
    }
    if (this.state.data) {
      // If the data returned from the API then load the App component
      return <App playerId={playerID} data={this.state.data} reset={this.reset} />;
    }
    // If there is still no data render the spinning loader
    // TODO Add the spinning loader
    return (
      <div className="error-div">
        <p className="error-text">LOADING...</p>
      </div>
    );
  }
  // The simplest React render method ever
  render() {
    return (!this.state.launched) ? this.renderHome() : this.renderApp();
  }
}

export default Root;
