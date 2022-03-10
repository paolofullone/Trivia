import getToken from '../../services/TriviaApi';
import getQuestions from '../../services/GetQuestions';

export const LOGIN = 'LOGIN';

export const FETCH_TOKEN_SUCCESS = 'FETCH_TOKEN_SUCESS';
export const FETCH_QUESTIONS_SUCCESS = 'FETCH_QUESTIONS_SUCESS';
export const FETCH_GRAVATAR_SUCCESS = 'FETCH_GRAVATAR_SUCESS';

export const FETCH_TOKEN_FAILURE = 'FETCH_TOKEN_FAILURE';
export const FETCH_QUESTIONS_FAILURE = 'FETCH_QUESTIONS_FAILURE';
export const FETCH_GRAVATAR_FAILURE = 'FETCH_GRAVATAR_FAILURE';

export const loginAction = (payload) => ({
  type: LOGIN,
  payload,
});

export const QuestionSuccessAction = (payload) => ({
  FETCH_QUESTIONS_SUCCESS,
  payload,
});

export const QuestionFailureAction = (error) => ({
  FETCH_QUESTIONS_FAILURE,
  error,
});

export function fetchTokenSuccessAction(payload) {
  return {
    type: FETCH_TOKEN_SUCCESS,
    payload,
  };
}

export function fetchTokenFailureAction(error) {
  return {
    type: FETCH_TOKEN_FAILURE,
    error,
  };
}

export const fetchTokenThunk = () => (dispatch) => getToken()
  .then((response) => {
    dispatch(fetchTokenSuccessAction(response));
  }).catch((error) => {
    dispatch(fetchTokenFailureAction(error));
  });

export const fetchQuestionThunk = () => (dispatch) => getQuestions()
  .then((response) => {
    dispatch(QuestionSuccessAction(response));
  }).catch((error) => {
    dispatch(QuestionFailureAction(error));
  });
