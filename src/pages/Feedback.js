import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HeaderFeedback from '../components/HeaderFeedback';

const MINIMUM_ASSERTIONS = 3;

class Feedback extends Component {
  handleClickHome = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { assertions } = this.props;
    console.log(assertions);
    return (
      <div>
        <h2>Feedback</h2>
        <HeaderFeedback />
        <p>mensagem de feedback</p>
        <p data-testid="feedback-text">
          {assertions < MINIMUM_ASSERTIONS ? 'Could be better...' : 'Well Done!'}
        </p>
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

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  assertions: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
