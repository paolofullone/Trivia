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
    if (results.length) {
      console.log('entrou no if');
      this.setState({
        questions: results,
      });
    } else {
      console.log('entrou no else');
      this.getQuestionsAgain();
    }
  }

  getQuestionsAgain = async () => {
    const { token } = await getToken();
    const results = await getQuestions(token);
    console.log('results no getQuestionsAgain: ', results);
    this.setState({ questions: results });
  }

  handleClick = () => {
    const { questionIndex } = this.state;
    const QUESTIONS = 4;
    if (questionIndex < QUESTIONS) {
      // fazer a lógica da próxima pergunta
      this.setState({ questionIndex: questionIndex + 1 });
    } else {
      const { history } = this.props;
      console.log('está na última pergunta');
      history.push('/feedback');
    }
  }

  // função aqui para renderizar

  // questions[questionIndex]
  // quando acabar a question faz um this.setstate questionIndex+1
  // quando chegar na quinta pergunta o botão "proxima" manda para outra tela.

  // primeiro gera os 4 botões
  // gera o correct com o data-test id dele
  // o incorrect ou os 3 incorrects gera com data-testid${index}
  // e soma mais 1 no index enquanto existir(booleano soma uma vez só)
  // let index = 0 e soma até no máximo 2
  // depois faz o shuffle
  // return 4 (<button></button>)

  // onde chamar a renderQuestion a primeira vez?
  renderBtns = (questions, questionIndex) => {
    const {
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = questions[questionIndex];
    const btnCorrect = (
      <button
        type="button"
        data-testid="correct-answer"
        onClick={ this.verifyAnswer }
      >
        {correctAnswer}
      </button>);
    const btnsIncorrect = incorrectAnswers.map((answer, index) => (
      <button
        type="button"
        data-testid={ `wrong-answer-${index}` }
        key={Math.random()}
        onClick={ this.verifyAnswer }
      >
        {answer}
      </button>
    ));
    return this.shuffleBtns(btnCorrect, btnsIncorrect);
  }

  // https://flaviocopes.com/how-to-shuffle-array-javascript/
  // let list = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  // list = list.sort(() => Math.random() - 0.5)

  shuffleBtns = (btnCorrect, btnsIncorrect) => {
    const btns = [btnCorrect, ...btnsIncorrect];
    console.log(btns);
    const NUMBER = 0.5;
    return btns.sort(() => Math.random() - NUMBER);
  }

  render() {
    console.log('passou no render');
    const { questions, questionIndex } = this.state;
    console.log('Questões: ', questions, questionIndex);
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
            {this.renderBtns(questions, questionIndex)}
          </div>
          <button type="button" onClick={ this.handleClick }>
            Próxima
          </button>
        </div>
      </div>

    );
  }
}

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

// fazer um componente para cada pergunta e passar cada pergunta via props
