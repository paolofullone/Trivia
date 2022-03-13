import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { addLocalStorageUser } from '../utils/localStorage';
import { userAction } from '../redux/actions';
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
    // const { seconds } = this.state;
    // console.log(seconds);
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
      // console.log('redirect');
      this.savePlayerLocalStorage();
      await this.updatePlayerInfo();
      history.push('/feedback');
    }
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
  // perguntar na monitoria porque a segunda não pode ter callback
  // poderia colocar tudo em outra função

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
  // se no teste puder ler o score do redux, retirar essa atualização do localstorage

  prepareNextQuestion = async (target) => {
    this.renderBtns();
    this.calculateScore(target);
    this.savePlayerLocalStorage();
    await this.updatePlayerInfo();
  }

  calculateScore = (target) => {
    // console.log(target);
    const { questionIndex, seconds } = this.state;
    const { questions } = this.props;
    const { difficulty } = questions[questionIndex];
    const multiplier = { hard: 3, medium: 2, easy: 1 };
    if (target.className === 'correct ') {
      const POINTS = 10;
      const answerScore = (POINTS + (seconds * multiplier[difficulty]));
      this.setState((prevState) => ({
        score: prevState.score + answerScore,
        assertions: prevState.assertions + 1,
      }));
    }
  }

// acertei a pergunta, atualizou no state, não atualizou no localStorage nem no Redux

  savePlayerLocalStorage = () => {
    const { score, assertions } = this.state;
    const { player: { playerName, image } } = this.props;
    const playerRanking = { playerName, image, score, assertions };
    addLocalStorageUser(playerRanking);
    // saving in redux as well
  };

  updatePlayerInfo = async () => {
    const { score, assertions } = this.state;
    const { player: { playerName, image }, addUserDispatch } = this.props;
    const payload = { playerName, score, image, assertions };
    await addUserDispatch(payload);
  }

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
    // return this.shuffleBtns(btnCorrect, btnsIncorrect);
  }

  // https://flaviocopes.com/how-to-shuffle-array-javascript/
  shuffleBtns = (btnCorrect, btnsIncorrect) => {
    const btns = [btnCorrect, ...btnsIncorrect];
    const NUMBER = 0.5;
    return btns.sort(() => Math.random() - NUMBER);
  }

  render() {
    console.log(this.props);
    // const { player } = this.props;
    // console.log(player);
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
            {/* {this.renderBtns()} */}
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

const mapStateToProps = (state) => ({
  questions: state.question.questions,
  player: state.player,
});

const mapDispatchToProps = (dispatch) => ({
  addUserDispatch: (payload) => dispatch(userAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
