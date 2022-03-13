import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { fetchTokenThunk, userAction } from '../redux/actions';
import { addLocalStorageUser } from '../utils/localStorage';

class Login extends Component {
state={
  userName: '',
  userEmail: '',
  disablePlayBtn: true,
}

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.enableBtn());
  }

  enableBtn = () => {
    const { userName, userEmail } = this.state;
    const emailRegex = (/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(userEmail);
    const MIN_LENGTH = 1;

    if (emailRegex && userName.length >= MIN_LENGTH) {
      return this.setState({ disablePlayBtn: false });
    }
    return this.setState({ disablePlayBtn: true });
  }

  setLocalStorageUser = async () => {
    const { userName, userEmail } = this.state;
    const { addUserDispatch } = this.props;
    const userMd5 = md5(userEmail).toString();
    const image = `https://www.gravatar.com/avatar/${userMd5}`;
    const user = { playerName: userName, score: 0, image, assertions: 0 };
    await addUserDispatch(user);
    addLocalStorageUser(user);
  }

  handleSubmit = async () => {
    const { history, fetchToken } = this.props;
    await this.setLocalStorageUser();
    await fetchToken();
    history.push('/game');
  }

  handleClickConfig= () => {
    const { history } = this.props;
    history.push('/config');
  }

  render() {
    const { userName, userEmail, disablePlayBtn } = this.state;
    return (
      <form>
        <label htmlFor="userName">
          Nome:
          <input
            type="text"
            onChange={ this.handleChange }
            data-testid="input-player-name"
            name="userName"
            id="userName"
            value={ userName }
          />
        </label>
        <label htmlFor="gravatarEmail">
          Email:
          <input
            type="email"
            onChange={ this.handleChange }
            data-testid="input-gravatar-email"
            name="userEmail"
            id="userEmail"
            value={ userEmail }
          />
        </label>
        <div className="login-btn">
          <button
            type="button"
            onClick={ this.handleSubmit }
            data-testid="btn-play"
            disabled={ disablePlayBtn }
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
  addUserDispatch: PropTypes.func.isRequired,
  fetchToken: PropTypes.func.isRequired,
  // fetchQuestions: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchToken: () => dispatch(fetchTokenThunk()),
  addUserDispatch: (payload) => dispatch(userAction(payload)),
});

export default connect(null, mapDispatchToProps)(Login);
