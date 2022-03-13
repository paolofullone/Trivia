import React, { Component } from 'react';
import { readUsers } from '../utils/localStorage';

// pegar o userName do estado global
// console.log(readUsers());

class Header extends Component {
  render() {
    const users = readUsers();
    const { name, image, score } = users[users.length - 1];
    console.log(name, image, score);

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
