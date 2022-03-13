import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Questions from '../components/Questions';
import getQuestions from '../services/GetQuestions';
import getToken from '../services/GetToken';
import { questionsSuccessAction } from '../redux/actions';

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
        <h1>Game</h1>
        {questions && (
          <section>
            <Header />
            <Questions { ...this.props } />
          </section>
        )}

      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: (questions) => dispatch(questionsSuccessAction(questions)),
});

const mapStateToProps = ({ token }) => ({ token });

export default connect(mapStateToProps, mapDispatchToProps)(Game);
