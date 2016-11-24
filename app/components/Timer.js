import React, { Component } from 'react';

var interval;

class Timer extends Component {
  constructor() {
    super();
    // this.incrementTimer = this.incrementTimer.bind(this);
    this.handleLower = this.handleLower.bind(this);
    this.startTimer = this.startTimer.bind(this);
  }
  componentWillMount() {
    const spell = this.props.spell;
    let elapsed = spell.cooldown;
    if (this.props.hasInsight) {
      const discount = (15 / 100) * elapsed;
      elapsed = Math.round(elapsed - discount);
    }
    this.setState({ elapsed });
  }
  componentDidMount() {
    interval = this.startTimer();
  }
  componentWillUnmount() {
    window.clearInterval();
  }
  startTimer() {
    return window.setInterval(() => {
      const elapsed = this.state.elapsed - 1;
      if (elapsed <= 0) {
        window.clearInterval(interval);
        this.props.done();
      } else {
        this.setState({ elapsed });
      }
    }, 1000);
  }
  handleLower() {
    const elapsed = this.state.elapsed - 2;
    this.setState({ elapsed });
  }
  render() {
    const minutes = Math.floor(this.state.elapsed / 60);
    const seconds = this.state.elapsed % 60;
    return (
      <div className="inline-wrapper">
        <div className="counts">{minutes}m</div>
        <div className="counts">{seconds}s</div>
        <div onClick={this.handleLower} className="less">-</div>
      </div>
    );
  }
}

export default Timer;
