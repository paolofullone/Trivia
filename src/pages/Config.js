import React, { Component } from 'react';
import { connect } from 'react-redux';
import getCategories from '../services/GetCategories';
import getQuestionsAndCat from '../services/GetQuestionsCategory';
import { questionsSuccessAction, clearScoreAction } from '../redux/actions';
import { readPlayer, savePlayer } from '../utils/localStorage';

class Config extends Component {
  state = {
    localCat: [],
    selectedCat: '',
    selectedDifficulty: '',
    // selectedAmountOfQuestions: '',
    selectedType: '',
  }

  componentDidMount = async () => {
    const localCat = this.state;
    console.log(localCat);
    const gameCategories = await getCategories();
    console.log(gameCategories);
    this.setState({ localCat: [...gameCategories] });
  }

  onChangeCat = ({ target: { value } }) => {
    this.setState({ selectedCat: value });
  }

  onChangeDifficulty = ({ target: { value } }) => {
    this.setState({ selectedDifficulty: value });
  }

  onChangeType = ({ target: { value } }) => {
    console.log(value);
    this.setState({ selectedType: value });
  }

  // não funcionou...
  // handleChange = ({ target }) => {
  //   const { name, value } = target;
  //   this.setState({ [name]: value });
  // }

  playBtn = async () => {
    const { fetchQuestions, history, clearScoreDispatch } = this.props;
    const player = { ...readPlayer() };
    player[0].score = 0;
    console.log(player);
    savePlayer(player);
    clearScoreDispatch();
    const { selectedCat, selectedDifficulty, selectedType } = this.state;
    const questions = await getQuestionsAndCat(selectedCat, selectedDifficulty, selectedType);
    fetchQuestions(questions);
    history.push('/game');
  }

  render() {
    const { localCat, selectedType, selectedDifficulty, selectedCat } = this.state;
    return (
      <div>
        <h1 data-testid="settings-title">Config</h1>
        <hr />
        <p>Categorias</p>
        {localCat.length > 1 && (
          <select onChange={ this.onChangeCat } value={ selectedCat }>
            {localCat.map(({ id, name }) => (
              <option key={ id } value={ id }>{name}</option>
              // <option key={ nanoid() } value={ id } label={ name } />
            ))}
          </select>
        )}
        <hr />
        <p>Dificuldade</p>
        <select onChange={ this.onChangeDifficulty } value={ selectedDifficulty }>
          <option value="" label="Select" />
          <option value="easy" label="Easy" />
          <option value="medium" label="Medium" />
          <option value="hard" label="Hard" />
        </select>
        <hr />
        <p>Tipos de perguntas</p>
        <select onChange={ this.onChangeType } value={ selectedType }>
          <option value="" label="Select" />
          <option value="boolean" label="True/False" />
          <option value="multiple" label="Multiple Choices" />
        </select>
        <button type="button" onClick={ this.playBtn }>Play</button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: (questions) => dispatch(questionsSuccessAction(questions)),
  clearScoreDispatch: () => dispatch(clearScoreAction()),

});

export default connect(null, mapDispatchToProps)(Config);
