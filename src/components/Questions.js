import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import './Questions.css';

const ONE_SECOND = 1000;
const TIME_LIMIT = 0;
const TIME_START = 30;
class Questions extends Component {
  state = {
    questionIndex: 0,
    disabled: false,
    btnHidden: true,
    correctBorder: '',
    incorrectBorder: '',
    shuffledAnswers: [],
    seconds: TIME_START,
  }

  componentDidMount() {
    this.renderBtns();
    this.countdown();
  }

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
      }));
    }, ONE_SECOND);
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
    const { seconds } = this.state;
    console.log(seconds);
  }

  handleClick = () => {
    const { questionIndex, disabled } = this.state;
    const QUESTIONS = 4;
    if (questionIndex < QUESTIONS) {
      // fazer a lógica da próxima pergunta
      this.setState({ questionIndex: questionIndex + 1 });
    } else {
      console.log('redirect');
      // return (<Redirect to="/feedback" />);
    }
    this.setState({
      disabled: !disabled,
      correctBorder: '',
      incorrectBorder: '',
    }, () => this.renderBtns());
  }

  verifyAnswer = async () => {
    const { disabled } = this.state;
    this.setState({
      disabled: !disabled,
      correctBorder: 'green-border',
      incorrectBorder: 'red-border',
      btnHidden: false,
    }, ()=>this.renderBtns());
  }

  renderBtns = () => {
    const { disabled, questionIndex, correctBorder, incorrectBorder } = this.state;
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
        className={ `correct ${correctBorder}` }
        disabled={ disabled }
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
        className={ `incorrect ${incorrectBorder}` }
        disabled={ disabled }
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
    // console.log(this.props);
    const { questionIndex, btnHidden, shuffledAnswers, seconds } = this.state;
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
            hidden={ btnHidden }
            data-testid="btn-next"
            type="button"
            onClick={ this.handleClick }
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
});

export default connect(mapStateToProps, null)(Questions);

// const mapDispatchToProps = (dispatch) => ({
//   fetchToken: () => dispatch(fetchTokenThunk()),
//   userInfo: (userName, userEmail) => dispatch(loginAction(userName, userEmail)),
// });
