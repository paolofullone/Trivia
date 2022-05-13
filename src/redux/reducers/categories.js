import {
  FETCH_CATEGORIES,
} from '../actions';

const initialState = {
  categories: [],
};

function categoriesReducer(state = initialState, action) {
  switch (action.type) {
  case FETCH_CATEGORIES:
    return {
      ...state,
      categories: action.categories,
    };
  default:
    return state;
  }
}

export default categoriesReducer;
