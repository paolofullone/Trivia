import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Question extends Component {

  render() {
    const { questions } = this.props;
    console.log('recebi as questions, aleluia: ', questions);
    return (
      <div>Question page</div>
    );
  }
}

Question.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Question;

// Pergunta de múltipla escolha
// {
//    "response_code":0,
//    "results":[
//       {
//          "category":"Entertainment: Video Games",
//          "type":"multiple",
//          "difficulty":"easy",
//          "question":"What is the first weapon you acquire in Half-Life?",
//          "correct_answer":"A crowbar",
//          "incorrect_answers":[
//             "A pistol",
//             "The H.E.V suit",
//             "Your fists"
//          ]
//       }
//    ]
// }