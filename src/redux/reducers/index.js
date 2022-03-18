import { combineReducers } from 'redux';
import playerReducer from './player';
import questionsReducer from './questions';
import tokenReducer from './token';
import categoriesReducer from './categories';
// import rankingReducer from './ranking';

const rootReducer = combineReducers({
  player: playerReducer,
  token: tokenReducer,
  question: questionsReducer,
  // ranking: rankingReducer,
  categories: categoriesReducer,
});

export default rootReducer;
