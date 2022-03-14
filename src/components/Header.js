import React, { Component } from 'react';
import { connect } from 'react-redux';

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
            src={ image }
            alt="avatar do usuário"
            data-testid="header-profile-picture"
          />
          <p data-testid="header-player-name">{ playerName }</p>
          <p data-testid="header-score">{ score }</p>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
});

export default connect(mapStateToProps)(Header);
