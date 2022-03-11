import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';
import getQuestions from '../services/GetQuestions';
import getToken from '../services/GetToken';

class Questions extends Component {
  state = {
    questions: [],
    questionIndex: 0,
  }

  componentDidMount = async () => {
    const { token } = this.props;
    const results = await getQuestions(token);
    console.log('results no did Mount: ', results);
    if (results.length) this.setState({ questions: results });
    else this.getNewToken();
  }

  getNewToken = async () => {
    const { token } = await getToken();
    const results = await getQuestions(token);
    console.log('results no getNewToken: ', results);
    this.setState({ questions: results });
  }

  // https://flaviocopes.com/how-to-shuffle-array-javascript/
  // let list = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  // list = list.sort(() => Math.random() - 0.5)

  render() {
    const { questions } = this.state;
    const shuffleList = (correctAnswer, incorrectAnswers) => {
      const answers = [correctAnswer, ...incorrectAnswers];
      const NUMBER = 0.5;
      return answers.sort(() => Math.random() - NUMBER);
    };
    return (
      <div>
        {questions.map(({ category, question, correct_answer: correctAnswer, incorrect_answers: incorrectAnswers }) => (
          <div key={ Math.random() }>

            <p data-testid="question-text" key={ Math.random() }>{question}</p>
            <p data-testid="question-category" key={ Math.random() }>{category}</p>
            <div>
              {shuffleList(correctAnswer, incorrectAnswers).map((answer, index) => {
                let dataTestId = `wrong-answer-${index}`;
                if (answer === correctAnswer) dataTestId = 'correct-answer';
                return (
                  <button
                    type="button"
                    key={ Math.random() }
                    data-testit={ dataTestId }
                  >
                    {answer}
                  </button>
                );
              })}

            </div>
            <button type="button">
              Próxima
            </button>
          </div>
        ))}

      </div>
    );
  }
}
// category, correct_answer, difficulty, incorrect_answers, question, type
Questions.propTypes = {
  token: string.isRequired,
};

const mapStateToProps = ({ token }) => ({ token });

export default connect(mapStateToProps)(Questions);

// A aplicação deve ser capaz de gerar um novo token da API no caso de ele expirar
// A categoria da pergunta (campo category) deve ser exibida em um elemento com o atributo data-testid com o valor question-category para a pessoa que está jogando
// O texto da pergunta (campo question) deve ser exibido em um elemento com o atributo data-testid com o valor question-text para a pessoa que está jogando
// O texto com as alternativas devem ser exibidos seguindo as regras abaixo:
// O elemento com a alternativa correta deve possuir o atributo data-testid com o valor correct-answer
// Os elementos com as alternativas incorretas devem possuir o atributo data-testid com o valor wrong-answer-${index}, com ${index} iniciando com o valor 0
// As alternativas devem estar dentro de uma tag que possui o atributo data-testid com o valor answer-options
// As alternativas devem ser exibidas em ordem aleatória
// Dica: utilize botões (<button/>) para as alternativas
