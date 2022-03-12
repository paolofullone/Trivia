import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getQuestions from '../services/GetQuestions';
import getToken from '../services/GetToken';
import './Questions.css';

class Questions extends Component {
  state = {
    questions: [],
    questionIndex: 0,
    disabled: false,
    correctBorder: '',
    incorrectBorder: '',
  }

  componentDidMount = async () => {
    const { token } = this.props;
    const results = await getQuestions(token);
    if (results.length) {
      this.setState({
        questions: results,
      });
    } else {
      this.getQuestionsAgain();
    }
    console.log(results);
  }
  // componente separado para o timer

  getQuestionsAgain = async () => {
    const { token } = await getToken();
    const results = await getQuestions(token);
    this.setState({ questions: results });
  }

  handleClick = () => {
    const { questionIndex, disabled } = this.state;
    const QUESTIONS = 4;
    if (questionIndex < QUESTIONS) {
      // fazer a lógica da próxima pergunta
      this.setState({ questionIndex: questionIndex + 1 });
    } else {
      console.log('history.push');
      const { history } = this.props;
      history.push('/feedback');
    }
    this.setState({
      disabled: !disabled,
      correctBorder: '',
      incorrectBorder: '',
    });
  }

  verifyAnswer = async ({ target }) => {
    const { disabled } = this.state;
    this.setState({
      disabled: !disabled,
      correctBorder: 'green-border',
      incorrectBorder: 'red-border',
    });
    console.log(target.className);
    if (target.className === 'correct') {
      console.log(target);
      target.classList.add('green-border');
    }
    if (target.className === 'incorrect') {
      console.log(target);
      target.classList.add('red-border');
    }
  }

  renderBtns = (questions, questionIndex) => {
    const { disabled, correctBorder, incorrectBorder } = this.state;
    const {
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = questions[questionIndex];
    const btnCorrect = (
      <button
        type="button"
        data-testid="correct-answer"
        onClick={ this.verifyAnswer }
        className={ `correct ${correctBorder}` }
        disabled={ disabled }
      >
        {correctAnswer}
      </button>);
    const btnsIncorrect = incorrectAnswers.map((answer, index) => (
      <button
        type="button"
        data-testid={ `wrong-answer-${index}` }
        key={ Math.random() }
        onClick={ this.verifyAnswer }
        className={ `incorrect ${incorrectBorder}` }
        disabled={ disabled }

      >
        {answer}
      </button>
    ));
    return this.shuffleBtns(btnCorrect, btnsIncorrect);
  }

  // https://flaviocopes.com/how-to-shuffle-array-javascript/

  shuffleBtns = (btnCorrect, btnsIncorrect) => {
    const btns = [btnCorrect, ...btnsIncorrect];
    const NUMBER = 0.5;
    return btns.sort(() => Math.random() - NUMBER);
  }

  render() {
    console.log(this.props);
    const { questions, questionIndex } = this.state;
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

export default connect(mapStateToProps, null)(Questions);
