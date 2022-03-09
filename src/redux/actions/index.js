export const LOGIN = 'LOGIN';

export const BOOLEAN_QUESTION = 'BOOLEAN_QUESTION';
export const MULTIPLE_QUESTION = 'MULTIPLE_QUESTION';

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

export const booleanQuestionAction = (payload) => ({
  BOOLEAN_QUESTION,
  payload,
});

export const multipleQuestionAction = (payload) => ({
  MULTIPLE_QUESTION,
  payload,
});
