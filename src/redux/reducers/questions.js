import {
  FETCH_QUESTIONS_SUCCESS,
  FETCH_QUESTIONS_FAILURE,
} from '../actions';

const initialState = {};

function questionsReducer(state = initialState, { type, payload }) {
  switch (type) {
  case FETCH_QUESTIONS_SUCCESS:
    return payload;
  case FETCH_QUESTIONS_FAILURE:
    return payload;
  default:
    return state;
  }
}

export default questionsReducer;
