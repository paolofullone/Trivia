import {
  FETCH_QUESTIONS,
} from '../actions';

const initialState = {
  questions: [],
};

function questionsReducer(state = initialState, action) {
  switch (action.type) {
  case FETCH_QUESTIONS:
    return {
      ...state,
      questions: action.questions,
    };
  default:
    return state;
  }
}

export default questionsReducer;
