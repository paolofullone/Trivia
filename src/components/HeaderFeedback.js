import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class HeaderFeedback extends Component {
  render() {
    const { player: { image, playerName, score } } = this.props;
    return (
      <div>
        <img
          src={ image }
          data-testid="header-profile-picture"
          alt="imagem do gravatar da pessoa jogadora"
        />
        <p data-testid="header-player-name">{playerName}</p>
        <p data-testid="header-score">{score}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
});

HeaderFeedback.propTypes = {
  player: PropTypes.shape({
    playerName: PropTypes.string,
    image: PropTypes.string,
    score: PropTypes.number,
  }).isRequired,
};

export default connect(mapStateToProps)(HeaderFeedback);
