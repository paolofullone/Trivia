import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import './Questions.css';

class Questions extends Component {
    state = {
      questionIndex: 0,
      disabled: false,
      correctBorder: '',
      incorrectBorder: '',
      btnHidden: true,
      shuffledAnswers: [],
    }

    componentDidMount() {
      this.renderBtns();
    }

  renderBtns = () => {
    const { disabled, correctBorder, incorrectBorder, questionIndex } = this.state;
    const {questions} = this.props;
    const {
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = questions[questionIndex];
    const btnCorrect = (
      <button
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
    console.log(this.props);
    const { questionIndex, btnHidden, shuffledAnswers } = this.state;
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
