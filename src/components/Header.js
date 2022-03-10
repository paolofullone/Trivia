import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import { string, number } from 'prop-types';

class Header extends Component {
  render() {
    const { userName, userScore, gravatarEmail } = this.props;
    const userMd5 = md5(gravatarEmail).toString();
    return (
      <div className="user-header">
        <header>
          <img
            src={ `https://www.gravatar.com/avatar/${userMd5}` }
            alt="avatar do usuário"
            data-testid="header-profile-picture"
          />
          <p data-testid="header-player-name">{ userName }</p>
          <p data-testid="header-score">{ userScore }</p>
        </header>
      </div>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  userName: player.name,
  gravatarEmail: player.gravatarEmail,
  userScore: player.score,
});

Header.propTypes = {
  userName: string.isRequired,
  gravatarEmail: string.isRequired,
  userScore: number.isRequired,
};

export default connect(mapStateToProps, null)(Header);
