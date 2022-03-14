import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  addLocalStoragePlayer,
  addLocalStoragePlayersRanking,
} from '../utils/localStorage';
import { scoreAction } from '../redux/actions';
import './Questions.css';

const ONE_SECOND = 1000;
const TIME_LIMIT = 0;
const TIME_START = 30;
class Questions extends Component {
  state = {
    questionIndex: 0,
    score: 0,
    assertions: 0,
    disableAnswerBtn: false,
    disableNextBtn: true,
    greenBorder: '',
    redBorder: '',
    shuffledAnswers: [],
    seconds: TIME_START,
  }

  componentDidMount() {
    this.renderBtns();
    this.countdown();
  }

  // PODE RECEBER NEXT PROPS E NEXT STATE
  // shouldComponentUpdate(nextProps, nextState) {
  //   // console.log(nextProps);
  //   if (nextState.seconds < 1) return true;
  //   return false;
  // }

  // if reaches 0, stop timer.
  componentDidUpdate() {
    const { seconds } = this.state;
    if (seconds === TIME_LIMIT) {
      this.stop();
    }
  }

  // function to start countdown timer
  countdown = () => {
    this.timerId = setInterval(() => {
      this.setState((prevState) => ({
        seconds: prevState.seconds - 1,
        // disableAnswerBtn: prevState.seconds <= 2,
        // disableNextBtn: prevState.seconds >= 2,
      }));
    }, ONE_SECOND);
    // if (seconds <= 2) {
    //   const { disableAnswerBtn } = this.state;
    //   this.setState({ disableAnswerBtn: true });
    //   console.log(disableAnswerBtn);
    // }
  }

  // function to re-start timer in next question
  next = () => {
    this.setState({
      seconds: TIME_START,
    });
  }

  // function to stop countdown (implement setLocalStorage at the same time)
  stop = () => {
    clearInterval(this.timerId);
    // const { seconds } = this.state;
    // console.log(seconds);
  }

  handleClickNext = async () => {
    const { questionIndex, disableAnswerBtn } = this.state;
    const TOTAL_QUESTIONS = 4;
    if (questionIndex < TOTAL_QUESTIONS) {
      this.setState({ questionIndex: questionIndex + 1 });
    } else {
      const { history } = this.props;
      this.savePlayerLocalStorageRanking();
      history.push('/feedback');
    }
    // na ultima pergunta não entra nesse setState.
    this.setState({
      disableAnswerBtn: !disableAnswerBtn,
      greenBorder: '',
      redBorder: '',
      seconds: TIME_START,
      disableNextBtn: true,
    },
    () => this.renderBtns(),
    this.countdown());
  }

  verifyAnswer = async ({ target }) => {
    const { disableAnswerBtn } = this.state;
    this.stop();
    this.setState({
      disableAnswerBtn: !disableAnswerBtn,
      greenBorder: 'green-border',
      redBorder: 'red-border',
      disableNextBtn: false,
    },
    () => this.prepareNextQuestion(target));
  }

  prepareNextQuestion = async (target) => {
    this.renderBtns();
    this.calculateScore(target);
  }

  // dentro da calculateScore disparar a action que vai atualizar o redux, passando o score da questão respondida
  calculateScore = async (target) => {
    const { questionIndex, seconds, assertions, score } = this.state;
    const { questions, scoreDispatch, player: { playerName, image } } = this.props;
    const { difficulty } = questions[questionIndex];
    const multiplier = { hard: 3, medium: 2, easy: 1 };
    if (target.className === 'correct ') {
      const POINTS = 10;
      const answerScore = (POINTS + (seconds * multiplier[difficulty]));
      this.setState((prevState) => ({
        score: prevState.score + answerScore,
        assertions: prevState.assertions + 1,
      }));
      scoreDispatch(answerScore);
      const localScore = score + answerScore;
      const localAssertions = assertions + 1;
      const playerRanking = {
        playerName,
        image,
        score: localScore,
        assertions: localAssertions,
      };
      addLocalStoragePlayer(playerRanking);
    }
  }

  savePlayerLocalStorageRanking = () => {
    const { score, assertions } = this.state;
    const { player: { playerName, image } } = this.props;
    const playerRanking = { playerName, image, score, assertions };
    addLocalStoragePlayersRanking(playerRanking);
  };

  savePlayerLocalStorage = () => {
    const { score, assertions } = this.state;
    const { player: { playerName, image } } = this.props;
    const playerRanking = { playerName, image, score, assertions };
    addLocalStoragePlayer(playerRanking);
  };

  renderBtns = () => {
    const { disableAnswerBtn, questionIndex, greenBorder, redBorder } = this.state;
    const { questions } = this.props;
    const {
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = questions[questionIndex];
    const btnCorrect = (
      <button
        id="answer-button"
        key={ Math.random() }
        type="button"
        data-testid="correct-answer"
        onClick={ this.verifyAnswer }
        className={ `correct ${greenBorder}` }
        disableAnswerBtn={ disableAnswerBtn }
      >
        {correctAnswer}
      </button>);
    const btnsIncorrect = incorrectAnswers.map((answer, index) => (
      <button
        id="answer-button"
        type="button"
        data-testid={ `wrong-answer-${index}` }
        key={ Math.random() }
        onClick={ this.verifyAnswer }
        className={ `incorrect ${redBorder}` }
        disableAnswerBtn={ disableAnswerBtn }
      >
        {answer}
      </button>
    ));
    const shuflled = this.shuffleBtns(btnCorrect, btnsIncorrect);
    this.setState({ shuffledAnswers: shuflled });
  }

  // https://flaviocopes.com/how-to-shuffle-array-javascript/
  shuffleBtns = (btnCorrect, btnsIncorrect) => {
    const btns = [btnCorrect, ...btnsIncorrect];
    const NUMBER = 0.5;
    return btns.sort(() => Math.random() - NUMBER);
  }

  render() {
    const { questions } = this.props;
    const { questionIndex, disableNextBtn, shuffledAnswers, seconds } = this.state;
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
            {shuffledAnswers}
          </div>
          <p>{seconds}</p>
          <button
            key={ Math.random() }
            hidden={ disableNextBtn }
            data-testid="btn-next"
            type="button"
            onClick={ this.handleClickNext }
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

Questions.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  scoreDispatch: PropTypes.func.isRequired,
  player: PropTypes.shape({
    playerName: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
  questions: PropTypes.shape({
    category: PropTypes.string,
    length: PropTypes.number,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.question.questions,
  player: state.player,
});

const mapDispatchToProps = (dispatch) => ({
  scoreDispatch: (payload) => dispatch(scoreAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
