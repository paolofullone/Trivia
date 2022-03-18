import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Questions from '../components/Questions';
import getQuestions from '../services/GetQuestions';
import getToken from '../services/GetToken';
import { questionsSuccessAction } from '../redux/actions';
import './Game.css';

class Game extends Component {
  state = ({ questions: '' })

  componentDidMount = async () => {
    const { token, fetchQuestions } = this.props;
    const results = await getQuestions(token);
    if (results.length) {
      fetchQuestions(results);
      return this.setState({ questions: results });
    }
    this.getQuestionsAgain();
  }
  // componente separado para o timer

  getQuestionsAgain = async () => {
    const { fetchQuestions } = this.props;
    const { token } = await getToken();
    const results = await getQuestions(token);
    if (results.length) {
      fetchQuestions(results);
      return this.setState({ questions: results });
    }
  }

  render() {
    const { questions } = this.state;
    // console.log(questions);
    return (
      <div>
        <h1 className="game-title">Game</h1>
        {questions && (
          <section>
            <Header />
            <div className="game-screen-container">
              <Questions { ...this.props } />
            </div>
          </section>
        )}
        <div>
          <img src="https://i.imgur.com/e2lVtD4.png" alt="imagem do pink" className="game-screen-image1" />
          <img src="https://i.imgur.com/uqTfRDO.png" alt="imagem do cérebro" className="game-screen-image2" />
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  token: PropTypes.string.isRequired,
  fetchQuestions: PropTypes.func.isRequired,

};

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: (questions) => dispatch(questionsSuccessAction(questions)),
});

const mapStateToProps = ({ token }) => ({ token });

export default connect(mapStateToProps, mapDispatchToProps)(Game);
