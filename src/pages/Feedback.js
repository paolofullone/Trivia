import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HeaderFeedback from '../components/HeaderFeedback';
import './Feedback.css';

const MINIMUM_ASSERTIONS = 3;

class Feedback extends Component {
  handleClickHome = () => {
    const { history } = this.props;
    history.push('/');
  }

  handleClickRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  }

  handleClickConfig = () => {
    const { history } = this.props;
    history.push('/config');
  }

  render() {
    const { assertions, score } = this.props;
    return (
      <div className="container-feedback">
        <div>
          <div>
            <h1>FEEDBACK</h1>
          </div>
          <HeaderFeedback />
          {/* <p data-testid="feedback-text">mensagem de feedback</p> */}
          <p data-testid="feedback-text">
            O placar final foi:
            {assertions
          < MINIMUM_ASSERTIONS ? 'Could be better...' : 'Well Done!'}
          </p>
          <p data-testid="feedback-total-score">{score}</p>
          <p>
            A quantidade de perguntas respondidas corretamente foi:
          </p>
          <p data-testid="feedback-total-question">{assertions}</p>
        </div>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.handleClickHome }
          className="feedback"
        >
          Home
        </button>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.handleClickHome }
          className="feedback"
        >
          Play Again
        </button>
        <button
          className="feedback"
          type="button"
          data-testid="btn-ranking"
          onClick={ this.handleClickRanking }
        >
          Ranking
        </button>
        <button
          className="feedback"
          type="button"
          onClick={ this.handleClickConfig }
        >
          Configurações
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
