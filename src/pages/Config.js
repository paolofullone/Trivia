import React, { Component } from 'react';
import { connect } from 'react-redux';
import getCategories from '../services/GetCategories';
import getQuestionsAndCat from '../services/GetQuestionsCategory';
import { questionsSuccessAction } from '../redux/actions';

class Config extends Component {
  state = {
    localCat: [{ id: 1000, name: 'select a category' }],
    selectedCat: null,
  }

  componentDidMount = async () => {
    const localCat = this.state;
    console.log(localCat);
    const gameCategories = await getCategories();
    this.setState({ localCat: [...localCat.localCat, ...gameCategories] });
  }

  onChange = async ({ target: { value } }) => {
    const { fetchQuestions, history } = this.props;
    console.log(value);
    this.setState({ selectedCat: value });
    // mandar a categoria para o estado global e fazer o fetch das perguntas
    const questions = await getQuestionsAndCat(value);
    await fetchQuestions(questions);
    // PAREI AQUI
    // fazer um botão "Play customized e aguardar as outras escolhas (dificuldade e tipo)"
    history.push('/game');
  }

  render() {
    const { localCat, selectedCat } = this.state;
    console.log(localCat);
    console.log(selectedCat);
    return (
      <div>
        <h1 data-testid="settings-title">Config</h1>
        <hr />
        <select onChange={ this.onChange }>
          {localCat.length > 1 && localCat.map(({ id, name }) => (
            <option key={ id } value={ id }>{name}</option>
          ))}
        </select>
      </div>
    );
  }
}

//
const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: (questions) => dispatch(questionsSuccessAction(questions)),
});

export default connect(null, mapDispatchToProps)(Config);
