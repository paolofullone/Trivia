import { combineReducers } from 'redux';
import playerReducer from './player';
import questionsReducer from './questions';
import tokenReducer from './token';

const rootReducer = combineReducers({
  player: playerReducer,
  token: tokenReducer,
  question: questionsReducer,
});

export default rootReducer;
