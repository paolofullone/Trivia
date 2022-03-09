import {
  FETCH_QUESTIONS_SUCCESS,
  FETCH_QUESTIONS_FAILURE,
  BOOLEAN_QUESTION,
  MULTIPLE_QUESTION,
} from '../actions';

const initialState = {};

function questionsReducer(state = initialState, { type, payload }) {
  switch (type) {
  case MULTIPLE_QUESTION:
    return payload;
  case BOOLEAN_QUESTION:
    return payload;
  case FETCH_QUESTIONS_SUCCESS:
    return payload;
  case FETCH_QUESTIONS_FAILURE:
    return payload;
  default:
    return state;
  }
}

export default questionsReducer;
