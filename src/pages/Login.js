import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { fetchTokenThunk, loginAction } from '../redux/actions';

class Login extends Component {
state={
  userName: '',
  userEmail: '',
  disableBtn: true,
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
      return this.setState({ disableBtn: false });
    }
    return this.setState({ disableBtn: true });
  }

  handleSubmit = async () => {
    const { history, userInfo, fetchToken } = this.props;
    const { userName, userEmail } = this.state;
    console.log(userName);
    this.setLocalStorageUser(userName, userEmail);
    await fetchToken();
    userInfo(userName, userEmail);
    history.push('/game');
  }

  setLocalStorageUser = (userName, userEmail) => {
    const userMd5 = md5(userEmail).toString();
    const image = `https://www.gravatar.com/avatar/${userMd5}`;
    localStorage.setItem('user', JSON.stringify(
      { name: userName, score: 0, image },
    ));
  }

  handleClickConfig= () => {
    const { history } = this.props;
    history.push('/config');
  }

  render() {
    const { userName, userEmail, disableBtn } = this.state;
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
  userInfo: (userName, userEmail) => dispatch(loginAction(userName, userEmail)),
  // fetchQuestions: () => dispatch(fetchQuestionThunk()),
});

export default connect(null, mapDispatchToProps)(Login);
