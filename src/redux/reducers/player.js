import { LOGIN, QUESTION_SCORE, CLEAR_SCORE } from '../actions';

const initialState = {
  playerName: '',
  assertions: 0,
  score: 0,
  image: '',
};

function playerReducer(state = initialState, action) {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      playerName: action.payload.playerName,
      image: action.payload.image,
      assertions: action.payload.assertions,
      score: action.payload.score,
    };
  case QUESTION_SCORE:
    return {
      ...state,
      assertions: state.assertions + 1,
      score: state.score + action.answerScore,
    };
  case CLEAR_SCORE:
    return {
      ...state,
      score: 0,
    };
  default:
    return state;
  }
}

export default playerReducer;
