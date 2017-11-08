// Initial state
const initialState = {
  error: null,
};

// Actions
const ERROR_FETCH = 'Error/FETCH';

// Action creators
export function errorFetch(error) {
  return {
    type: ERROR_FETCH,
    payload: error,
  };
}

// reducer
export default function ErrorReducer(state = initialState, action) {
  switch (action.type) {
    case ERROR_FETCH:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
