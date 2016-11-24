import React, { Component } from 'react';

class Champion extends Component {
  render() {
    return (
      <div className="champion">
        <img
          src={`../resources/championImages/${this.props.champion}.png`}
          alt={this.props.champion}
        />
        <div className="spells-container">
          <img
            src={`../resources/summonerSpellsImages/${this.props.spells[0].name}.png`}
            alt={this.props.spells[0].name}
          />
          <img
            src={`../resources/summonerSpellsImages/${this.props.spells[1].name}.png`}
            alt={this.props.spells[1].name}
          />
        </div>
        <div className="timer-container">

        </div>
        <br />
      </div>
    );
  }
}

export default Champion;
