import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { fetchQuestionThunk } from '../redux/actions';

class Questions extends Component {
  // componentDidMount() {
  //   this.fetch();
  // }

  // fetch = async () => {
  //   const { fetchQuestions } = this.props;
  //   await fetchQuestions();
  // }

  render() {
    console.log(this.props);
    return (
      <div>Questions</div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.question.questions,
  responseCode: state.question.responseCode,
});

export default connect(mapStateToProps, null)(Questions);
