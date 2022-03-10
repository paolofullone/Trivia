import React, { Component } from 'react';
import { connect } from 'react-redux';

class Game extends Component {
  render() {
    return (
      <div>Game</div>
    );
  }
}

export default connect()(Game);
