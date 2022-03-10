import { FETCH_TOKEN_SUCCESS, FETCH_TOKEN_FAILURE } from '../actions';

const initialState = '';

function tokenReducer(state = initialState, action) {
  switch (action.type) {
  case FETCH_TOKEN_SUCCESS:
    return action.payload.token;

  case FETCH_TOKEN_FAILURE:
    return {
      ...state,
      error: action.error,
    };
  default:
    return state;
  }
}

export default tokenReducer;
