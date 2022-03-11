import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getQuestions from '../services/GetQuestions';
import getToken from '../services/GetToken';

class Questions extends Component {
  state = {
    questions: [],
    questionIndex: 0,
  }

  componentDidMount = async () => {
    const { token } = this.props;
    const results = await getQuestions(token);
    console.log('results no did Mount: ', results);
    if (results.length) {
      console.log('entrou no if');
      this.setState({
        questions: results,
      });
    } else {
      console.log('entrou no else');
      this.getQuestionsAgain();
    }
  }

  getQuestionsAgain = async () => {
    const { token } = await getToken();
    const results = await getQuestions(token);
    console.log('results no getQuestionsAgain: ', results);
    this.setState({ questions: results });
  }

  handleClick = () => {
    const { questionIndex } = this.state;
    const QUESTIONS = 4;
    if (questionIndex < QUESTIONS) {
      // fazer a lógica da próxima pergunta
      this.setState({ questionIndex: questionIndex + 1 });
    } else {
      const { history } = this.props;
      console.log('está na última pergunta');
      history.push('/feedback');
    }
  }

  verifyAnswer = ({ target }) => {
    console.log(target);
  }

  renderBtns = (questions, questionIndex) => {
    const {
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = questions[questionIndex];
    const btnCorrect = (
      <button
        type="button"
        data-testid="correct-answer"
        onClick={ this.verifyAnswer }
      >
        {correctAnswer}
      </button>);
    const btnsIncorrect = incorrectAnswers.map((answer, index) => (
      <button
        type="button"
        data-testid={ `wrong-answer-${index}` }
        key={ Math.random() }
        onClick={ this.verifyAnswer }
      >
        {answer}
      </button>
    ));
    return this.shuffleBtns(btnCorrect, btnsIncorrect);
  }

  // https://flaviocopes.com/how-to-shuffle-array-javascript/

  shuffleBtns = (btnCorrect, btnsIncorrect) => {
    const btns = [btnCorrect, ...btnsIncorrect];
    console.log(btns);
    const NUMBER = 0.5;
    return btns.sort(() => Math.random() - NUMBER);
  }

  render() {
    console.log('passou no render');
    const { questions, questionIndex } = this.state;
    console.log('Questões: ', questions, questionIndex);
    if (!questions.length) return <p>loading</p>;
    const { category, question } = questions[questionIndex];
    return (
      <div>
        Game
        <div>
          <section>
            <p data-testid="question-text" key={ Math.random() }>{question}</p>
            <p data-testid="question-category" key={ Math.random() }>{category}</p>
          </section>

          <div data-testid="answer-options">
            {this.renderBtns(questions, questionIndex)}
          </div>
          <button type="button" onClick={ this.handleClick }>
            Próxima
          </button>
        </div>
      </div>

    );
  }
}

Questions.propTypes = {
  token: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = ({ token }) => ({ token });

export default connect(mapStateToProps)(Questions);
