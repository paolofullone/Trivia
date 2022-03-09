import React, { Component } from 'react';

export default class Login extends Component {
state={
  name: '',
  gravatarEmail: '',
  disableBtn: true,
}

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.enableBtn());
  }

  enableBtn = () => {
    const { name, gravatarEmail } = this.state;
    const emailRegex = (/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(gravatarEmail);
    const MIN_LENGTH = 1;

    if (emailRegex && name.length >= MIN_LENGTH) {
      return this.setState({ disableBtn: false });
    }
    return this.setState({ disableBtn: true });
  }

  render() {
    const { name, gravatarEmail, disableBtn } = this.state;
    return (
      <form>
        <label htmlFor="name">
          Nome:
          <input
            type="text"
            onChange={ this.handleChange }
            data-testid="input-player-name"
            name="name"
            id="name"
            value={ name }
          />
        </label>
        <label htmlFor="gravatarEmail">
          email:
          <input
            type="email"
            onChange={ this.handleChange }
            data-testid="input-gravatar-email"
            name="gravatarEmail"
            id="gravatarEmail"
            value={ gravatarEmail }
          />
        </label>
        <button
          type="button"
          onClick={ this.handleClick }
          data-testid="btn-play"
          disabled={ disableBtn }
        >
          Play
        </button>
      </form>
    );
  }
}
