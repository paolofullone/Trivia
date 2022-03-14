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
    const { assertions, score } = this.props;
    return (
      <div>
        <h2>Feedback</h2>
        <HeaderFeedback />
        <p>mensagem de feedback</p>
        <p data-testid="feedback-text">
          {assertions < MINIMUM_ASSERTIONS ? 'Could be better...' : 'Well Done!'}
        </p>
        <p>
          O placar final foi:
        </p>
        <p data-testid="feedback-total-score">{score}</p>
        <p>
          A quantidade de perguntas respondidas corretamente foi:
        </p>
        <p data-testid="feedback-total-question">{assertions}</p>
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
  score: state.player.score,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
