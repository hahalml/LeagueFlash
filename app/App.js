import React, { Component } from 'react';
import { calculateInsight, getChampion, getMasteries } from './utils/helper';
import Champion from './components/Champion';
import { playerID } from './settings';
// import mockGame from './utils/mockGamePaolo.json'; // Mock data used for testing

class App extends Component {
  componentWillMount() {
    const data = this.props.data;
    console.log(data);
    // This is mock Data I used for testing
    // const data = mockGame;
    const participantsRaw = data.participants; // Array of participants to the game
    // Initialize an empty array that will hold all the participants objects only with
    // the proprieties that interest us
    debugger;
    const participants = [];
    const myIndex = participantsRaw.findIndex((participant) => participant.summonerId === playerID);
    // Loop over every partecipant object from the Game to select the info we need
    for (var i in participantsRaw) {
      // We only want to save the champions on the enemy team
      if (participantsRaw[i].teamId !== participantsRaw[myIndex].teamId) {
        const username = participantsRaw[i].summonerName;
        // Get the name of the champion
        const champion = getChampion(participantsRaw[i]);
        // Get an array of objects with summoner spell "name" and "cooldown"
        const spells = getMasteries(participantsRaw[i]);
        // Returns true if the summoner has the Insight mastery
        const hasInsight = calculateInsight(participantsRaw[i]);
        // By default nobody has Ionian Boots
        const hasIonians = false;
        // Add the partecipant object to our Array
        participants[i] = { champion, hasInsight, spells, username, hasIonians };
      }
    }
    // Push the array in State
    this.setState({ participants });
  }

  render() {
    const players = this.state.participants;
    return (
      <div className="champions-container">
        {players.map(player => {
          return (
            <Champion
              key={player.username}
              playerInfo={player}
            />
          );
        })}
      </div>
    );
  }
}

App.PropTypes = {
  data: React.PropTypes.any.isRequired,
};

export default App;
