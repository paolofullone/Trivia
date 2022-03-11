import { LOGIN } from '../actions';

const initialState = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

function playerReducer(state = initialState, action) {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      name: action.userName,
      gravatarEmail: action.userEmail,
    };
  default:
    return state;
  }
}

export default playerReducer;
