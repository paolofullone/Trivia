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

// const mapDispatchToProps = (dispatch) => ({
//   fetchQuestions: () => dispatch(fetchQuestionThunk()),
// });

// export default connect(null, mapDispatchToProps)(Questions);
export default Questions;
