import getToken from '../../services/TriviaApi';
// import getQuestions from '../../services/GetQuestions';

export const LOGIN = 'LOGIN';

export const FETCH_TOKEN_SUCCESS = 'FETCH_TOKEN_SUCESS';
export const FETCH_QUESTIONS_SUCCESS = 'FETCH_QUESTIONS_SUCESS';
export const FETCH_GRAVATAR_SUCCESS = 'FETCH_GRAVATAR_SUCESS';

export const FETCH_TOKEN_FAILURE = 'FETCH_TOKEN_FAILURE';
export const FETCH_QUESTIONS_FAILURE = 'FETCH_QUESTIONS_FAILURE';
export const FETCH_GRAVATAR_FAILURE = 'FETCH_GRAVATAR_FAILURE';

export const loginAction = (userName, userEmail) => ({
  type: LOGIN,
  userName,
  userEmail,
});

export function QuestionSuccessAction(payload) {
  return {
    type: FETCH_QUESTIONS_SUCCESS,
    payload,
  };
}

export function QuestionFailureAction(error) {
  return {
    type: FETCH_QUESTIONS_FAILURE,
    error,
  };
}

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

const TRIVIA_QUESTIONS_BASE_API = 'https://opentdb.com/api.php?amount=5&token=';
const token = JSON.parse(localStorage.getItem('token'));

const getQuestions = async () => {
  const response = await fetch(`${TRIVIA_QUESTIONS_BASE_API}${token}`);
  const json = await response.json();
  localStorage.setItem('questions', JSON.stringify(json));

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

export const fetchQuestionThunk = () => (dispatch) => getQuestions()
  .then((response) => {
    dispatch(QuestionSuccessAction(response));
  }).catch((error) => {
    dispatch(QuestionFailureAction(error));
  });

export default getQuestions;
