import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Questions from '../components/Questions';

class Game extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <h1>Game</h1>
        <Header />
        <Questions />
      </div>
    );
  }
}

export default connect()(Game);
