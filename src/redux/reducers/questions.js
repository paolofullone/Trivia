import {
  FETCH_QUESTIONS_SUCCESS,
  FETCH_QUESTIONS_FAILURE,
} from '../actions';

const initialState = {
  questions: '',
  responseCode: '',
};

function questionsReducer(state = initialState, action) {
  switch (action.type) {
  case FETCH_QUESTIONS_SUCCESS:
    return {
      ...state,
      questions: action.payload.results,
      responseCode: action.payload.response_code,
    };
  case FETCH_QUESTIONS_FAILURE:
    return action.payload;
  default:
    return state;
  }
}

export default questionsReducer;
