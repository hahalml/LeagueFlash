import React, { Component } from 'react';
import './app.global.css';
import App from './App';
import { playerID, APIKey } from './settings';

class Root extends Component {
  constructor() {
    super();
    this.state = { playerID, APIKey, launched: false };
    this.start = this.start.bind(this);
    this.fetchGame = this.fetchGame.bind(this);
    this.renderApp = this.renderApp.bind(this);
    this.reset = this.reset.bind(this);
    this.updateTheState = this.updateTheState.bind(this);
  }
  // Function to retrieve the data for the game from the Riot API
  fetchGame() {
    return fetch('https://euw.api.pvp.net/observer-mode/rest/consumer/getSpectatorGameInfo/EUW1/'
      + playerID + '?api_key=' + APIKey).then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      }).then((data) => {
        this.updateTheState(data);
        return data;
      }).catch((err) => {
        console.log(err);
        // this.setState({
        //   error: err
        // });
      });
  }
  updateTheState(data) {
    console.log('UpdateTheState fired!');
    this.setState({ data });
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
      <div>
        <button className="launch-button" onClick={this.start}>
          START FLASH
        </button>
      </div>
    );
  }
  // What is displayed when you click the green Start button
  renderApp() {
    // TODO: Adjust the window size
    if (this.state.error) {
      return (
        <div>
          <p>Error! {this.state.error.message}</p>
          <button onClick={this.reset}>RESET</button>
        </div>
      );
    }
    if (this.state.data) {
      // If the data returned from the API then load the App component
      return <App data={this.state.data} reset={this.reset} />;
    }
    // If there is still no data render the spinning loader
    // TODO Add the spinning loader
    return <p>Loading</p>;
  }
  // The simplest React render method ever
  render() {
    return (!this.state.launched) ? this.renderHome() : this.renderApp();
  }
}

export default Root;
