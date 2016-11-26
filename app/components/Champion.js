import React, { Component } from 'react';
import Timer from './Timer';

class Champion extends Component {
  constructor() {
    super();
    this.toggleSpell1 = this.toggleSpell1.bind(this);
    this.toggleSpell2 = this.toggleSpell2.bind(this);
  }
  componentWillMount() {
    this.setState({ player: this.props.playerInfo, timer1: false, timer2: false });
  }
  toggleSpell1() {
    const timer1 = !this.state.timer1;
    this.setState({ timer1 });
  }
  toggleSpell2() {
    const timer2 = !this.state.timer2;
    this.setState({ timer2 });
  }
  render() {
    const divStyle1 = {
      backgroundColor: this.state.player.spells[0].color,
      color: this.state.player.spells[0].txtColor,
    };
    const divStyle2 = {
      backgroundColor: this.state.player.spells[1].color,
      color: this.state.player.spells[1].txtColor,
    };
    if (!this.state.timer1) {
      divStyle2.top = '30px';
    }

    return (
      <div className="champion">
        <div className="champion-image">
          <img
            src={`./images/championImages/${this.state.player.champion}.png`}
            alt={this.state.player.champion}
          />
        </div>
        <div className="spells-container">
          <img
            src={`./images/summonerSpellsImages/${this.state.player.spells[0].name}.png`}
            alt={this.state.player.spells[0].name}
            onClick={this.toggleSpell1.bind(this)}
          />
          <img
            src={`./images/summonerSpellsImages/${this.state.player.spells[1].name}.png`}
            alt={this.state.player.spells[1].name}
            onClick={this.toggleSpell2.bind(this)}
          />
        </div>
        <div className="timer-container">
          {(this.state.timer1) ? (
            <div className="timer timer1" style={divStyle1}>
              <Timer
                key={this.state.player.spells[0].name}
                hasInsight={this.state.player.hasInsight}
                spell={this.state.player.spells[0]}
                done={this.toggleSpell1}
              />
            </div>
          ) : null }
          {(this.state.timer2) ? (
            <div className="timer timer2" style={divStyle2}>
              <Timer
                key={this.state.player.spells[0].name}
                hasInsight={this.state.player.hasInsight}
                spell={this.state.player.spells[1]}
                done={this.toggleSpell2}
              />
            </div>
          ) : null }
        </div>
        <br />
      </div>
    );
  }
}

export default Champion;
