import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchTokenThunk } from '../redux/actions';

class Login extends Component {
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

  handleClick = () => {
    const { history, fetchToken } = this.props;
    console.log(history);
    fetchToken();
    history.push('/game');
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

Login.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchToken: () => dispatch(fetchTokenThunk()),
});

export default connect(null, mapDispatchToProps)(Login);
