import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Header.css';

// import { readUsers } from '../utils/localStorage';
// pegar o userName do estado global
// console.log(readUsers());

class Header extends Component {
  render() {
    const { player: { playerName, score, image } } = this.props;

    return (
      <div className="user-header">
        <header>
          <img
            className="user-profile-img"
            src={ image }
            alt="avatar do usuário"
            data-testid="header-profile-picture"
          />
          <h3 data-testid="header-player-name" className="header-name">{ playerName }</h3>
          <h2 data-testid="header-score" className="header-score">{ score }</h2>
        </header>
      </div>
    );
  }
}

Header.propTypes = {
  player: PropTypes.shape({
    playerName: PropTypes.string,
    image: PropTypes.string,
    score: PropTypes.number,
  }).isRequired,

};

const mapStateToProps = (state) => ({
  player: state.player,
});

export default connect(mapStateToProps)(Header);
