import getToken from '../../services/GetToken';
// import getQuestions from '../../services/GetQuestions';

export const LOGIN = 'LOGIN';

export const QUESTION_SCORE = 'QUESTION_SCORE';

export const FETCH_QUESTIONS = 'FETCH_QUESTIONS';

export const FETCH_TOKEN_SUCCESS = 'FETCH_TOKEN_SUCESS';
export const FETCH_TOKEN_FAILURE = 'FETCH_TOKEN_FAILURE';

export const userAction = (payload) => ({
  type: LOGIN,
  payload,
});

export const scoreAction = (answerScore) => ({
  type: QUESTION_SCORE,
  answerScore,
});

export const questionsSuccessAction = (questions) => ({
  type: FETCH_QUESTIONS,
  questions,
});

export function fetchTokenSuccessAction(token) {
  return {
    type: FETCH_TOKEN_SUCCESS,
    token,
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
