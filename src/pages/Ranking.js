import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { readPlayers } from '../utils/localStorage';

export default class Ranking extends Component {
  handleClickHome = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const players = readPlayers();
    console.log(players[0].image);
    console.log(players.sort((a, b) => b.score - a.score));
    return (
      <div>
        {players.sort((a, b) => b.score - a.score)
          .map(({ playerName, image, score }, index) => (
            <div key={ Math.random() }>
              <img src={ image } alt="gravatar da pessoa jogadora" />
              <p data-testid={ `player-name-${index}` }>{playerName}</p>
              <p data-testid={ `player-score-${index}` }>{score}</p>
            </div>
          ))}
        <h2 data-testid="ranking-title">Ranking</h2>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.handleClickHome }
        >
          Home
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
