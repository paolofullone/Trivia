import React, { Component } from 'react';

class Header extends Component {
  render() {
    const { name, image, score } = JSON.parse(localStorage.getItem('user'));

    return (
      <div className="user-header">
        <header>
          <img
            src={ image }
            alt="avatar do usuário"
            data-testid="header-profile-picture"
          />
          <p data-testid="header-player-name">{ name }</p>
          <p data-testid="header-score">{ score }</p>
        </header>
      </div>
    );
  }
}

export default Header;
