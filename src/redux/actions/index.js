import getToken from '../../services/GetToken';
// import getQuestions from '../../services/GetQuestions';

export const LOGIN = 'LOGIN';

export const FETCH_TOKEN_SUCCESS = 'FETCH_TOKEN_SUCESS';
export const FETCH_TOKEN_FAILURE = 'FETCH_TOKEN_FAILURE';

export const loginAction = (userName, userEmail) => ({
  type: LOGIN,
  userName,
  userEmail,
});

export const questionsSuccessAction = (payload) => ({
  type: LOGIN,
  payload,
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
