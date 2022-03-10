import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchTokenThunk, loginAction } from '../redux/actions';

class Login extends Component {
state={
  name: '',
  score: 0,
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
    const { history, fetchToken, userInfo } = this.props;
    console.log(history);
    fetchToken();
    userInfo(this.state);
    history.push('/game');
  }

  handleClickConfig= () => {
    const { history } = this.props;
    // console.log(this.props);
    history.push('/config');
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
          Email:
          <input
            type="email"
            onChange={ this.handleChange }
            data-testid="input-gravatar-email"
            name="gravatarEmail"
            id="gravatarEmail"
            value={ gravatarEmail }
          />
        </label>
        <div className="login-btn">
          <button
            type="button"
            onClick={ this.handleClick }
            data-testid="btn-play"
            disabled={ disableBtn }
          >
            Play
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ this.handleClickConfig }
          >
            Configurações
          </button>
        </div>
      </form>
    );
  }
}

Login.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  fetchToken: PropTypes.func.isRequired,
  userInfo: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchToken: () => dispatch(fetchTokenThunk()),
  userInfo: (user) => dispatch(loginAction(user)),
});

export default connect(null, mapDispatchToProps)(Login);
