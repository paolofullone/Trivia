import {
  FETCH_QUESTIONS_SUCCESS,
  FETCH_QUESTIONS_FAILURE,
} from '../actions';

const initialState = {
  questions: '',
  questions2: '',
  questions3: '',
};

function questionsReducer(state = initialState, action) {
  console.log(action);
  console.log(action.payload);

  switch (action.type) {
  case FETCH_QUESTIONS_SUCCESS:
    return {
      ...state,
      questions: action.payload.results,
      questions2: action,
      questions3: action.payload,
    };
  case FETCH_QUESTIONS_FAILURE:
    return action.payload;
  default:
    return state;
  }
}

export default questionsReducer;
