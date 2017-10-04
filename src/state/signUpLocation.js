// Initial state
const initialState = {
  value: 0,
};

// Actions
const INCREMENT = 'SignUpLocationState/INCREMENT';
const RESET = 'SignUpLocationState/RESET';

// Action creators
export const increment = () => ({ type: INCREMENT });
export const reset = () => ({ type: RESET });

// Reducer
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        value: state.value + 1,
      };

    case RESET:
      return initialState;

    default:
      return state;
  }
};
