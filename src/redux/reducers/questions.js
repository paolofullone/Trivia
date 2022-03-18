import {
  FETCH_QUESTIONS,
  CLEAR_QUESTIONS,
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
  case CLEAR_QUESTIONS:
    return {
      questions: [],
    };
  default:
    return state;
  }
}

export default questionsReducer;
