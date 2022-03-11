import React, { Component } from 'react';
import Header from '../components/Header';
import Questions from '../components/Questions';

class Game extends Component {
  render() {
    return (
      <div>
        <h1>Game</h1>
        <Header />
        <Questions />
      </div>
    );
  }
}

export default Game;
