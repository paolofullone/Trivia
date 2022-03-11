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
    // console.log('results: ', results);
    if (results.length) this.setState({ questions: results });
    else this.getNewToken();
  }

  getNewToken = async () => {
    const token = await getToken();
    const questions = await getQuestions(token);
    this.setState({ questions });
  }

  render() {
    const { questions } = this.state;
    console.log('questions: ', questions);
    return (
      <div>
        Questions
      </div>);
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

// https://flaviocopes.com/how-to-shuffle-array-javascript/
// let list = [1, 2, 3, 4, 5, 6, 7, 8, 9]
// list = list.sort(() => Math.random() - 0.5)
