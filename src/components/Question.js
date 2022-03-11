// import React, { Component } from 'react';
// import PropTypes from 'prop-types';

// class Question extends Component {
//     handleClick = () => {
//   const { questionIndex } = this.state;
//   const QUESTIONS = 4;
//   if (questionIndex <= QUESTIONS) {
//     // fazer a lógica da próxima pergunta
//     this.setState({ questionIndex: questionIndex + 1 });
//   } else {
//     console.log('está na última pergunta');
//   }
//     }
  
//     renderBtns = () => {
//     const { questions, questionIndex } = this.state;
//     const {
//       correct_answer: correctAnswer,
//       incorrect_answers: incorrectAnswers,
//     } = questions[questionIndex];
//     const btnCorrect = (
//       <button
//         type="button"
//         data-testid="correct-answer"
//         onClick={ this.verifyAnswer }
//       >
//         {correctAnswer}
//       </button>);
//     const btnsIncorrect = incorrectAnswers.map((answer, index) => (
//       <button
//         type="button"
//         data-testid={ `wrong-answer-${index}` }
//         key={ Math.random() }
//       >
//         {answer}
//       </button>
//     ));
//     this.shuffleBtns(btnCorrect, btnsIncorrect);
//   }

//     shuffleBtns = (btnCorrect, btnsIncorrect) => {
//     const btns = [btnCorrect, ...btnsIncorrect];
//     console.log(btns);
//     const NUMBER = 0.5;
//     return btns.sort(() => Math.random() - NUMBER);
//     }
  
//   render() {
//     console.log('passou no render');
//     const { questions, questionIndex } = this.state;
//     return (
//       <div>
//         QUESTION
//         <div>
//           {questions.length && questions[questionIndex].map(({ category, question }) => (
//             <section key={ Math.random() }>
//               <p data-testid="question-text" key={ Math.random() }>{question}</p>
//               <p data-testid="question-category" key={ Math.random() }>{category}</p>
//             </section>
//           ))}
//           <div>
//             {this.renderBtns}
//           </div>
//           <button type="button" onClick={ this.handleClick }>
//             Próxima
//           </button>
//         </div>
//       </div>

//     );
//   }
// }

// Question.propTypes = {
//   questions: PropTypes.arrayOf(PropTypes.object).isRequired,
// };

// export default Question;
