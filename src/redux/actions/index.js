import getToken from '../../services/GetToken';
import getCategories from '../../services/GetCategories';

export const LOGIN = 'LOGIN';

export const QUESTION_SCORE = 'QUESTION_SCORE';

export const FETCH_QUESTIONS = 'FETCH_QUESTIONS';
export const CLEAR_QUESTIONS = 'CLEAR_QUESTIONS';


export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const FETCH_CATEGORIES_ERROR = 'FETCH_CATEGORIES_ERROR';

export const FETCH_TOKEN_SUCCESS = 'FETCH_TOKEN_SUCESS';
export const FETCH_TOKEN_FAILURE = 'FETCH_TOKEN_FAILURE';

export const userAction = (payload) => ({
  type: LOGIN,
  payload,
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

export const questionsSuccessAction = (questions) => ({
  type: FETCH_QUESTIONS,
  questions,
});

// quando o jogador vem da tela de config não estava buscando novas perguntas na segunda vez que jogava com perguntas da mesma categoria, pois fiz uma validação com o tamanho do array de perguntas para resolver outro bug, que era vir com as perguntas de uma categoria específica e quando chegava na tela de game, eram sobrescritas pois fazia novo fetch.
export const clearQuestionsAction = () => ({
  type: CLEAR_QUESTIONS,
});

export const categoriesSuccessAction = (categories) => ({
  type: FETCH_CATEGORIES,
  categories,
});

export const categoriesFailureAction = (error) => ({
  type: FETCH_CATEGORIES_ERROR,
  error,
});

export const scoreAction = (answerScore) => ({
  type: QUESTION_SCORE,
  answerScore,
});

export const fetchTokenThunk = () => (dispatch) => getToken()
  .then((response) => {
    dispatch(fetchTokenSuccessAction(response));
  }).catch((error) => {
    dispatch(fetchTokenFailureAction(error));
  });

export const fetchCategoriesThunk = () => (dispatch) => getCategories()
  .then((categories) => {
    dispatch(categoriesSuccessAction(categories));
  }).catch((error) => {
    dispatch(categoriesFailureAction(error));
  });
