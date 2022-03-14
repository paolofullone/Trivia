import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Feedback extends Component {
  handleClickHome = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    // console.log(this.props);
    return (
      <div>
        <h2>Feedback</h2>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.handleClickHome }
        >
          Home
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
