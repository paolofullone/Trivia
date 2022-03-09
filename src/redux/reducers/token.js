import { FETCH_TOKEN_SUCCESS, FETCH_TOKEN_FAILURE } from '../actions';

const initialState = {
  response_code: 0,
  response_message: '',
  token: '',
};

function tokenReducer(state = initialState, action) {
  switch (action.type) {
  case FETCH_TOKEN_SUCCESS:
    return state;
  case FETCH_TOKEN_FAILURE:
    return state;
  default:
    return state;
  }
}

export default tokenReducer;
