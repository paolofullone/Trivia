import {
  CREATE_USER_RANKING,
} from '../actions';

const initialState = {
  playerName: '',
  gravatarEmail: '',
  score: 0,
  assertions: 0,
};

// function rangkingReducer(state = initialState, action) {
//   switch (action.type) {
//   case CREATE_USER_RANKING:
//     return {
//       ...state,
//       playerName: action.payload.userName,
//       gravatarEmail: action.payload.gravatarEmail,
//       score: action.payload.score,
//       assertions: action.payload.assertions,
//     };
//   default:
//     return state;
//   }
// }

// export default rangkingReducer;
