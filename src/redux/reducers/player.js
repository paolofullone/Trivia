import { LOGIN } from '../actions';

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
  default:
    return state;
  }
}

export default playerReducer;
