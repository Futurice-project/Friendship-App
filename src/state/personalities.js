export const RESET_PERSONALITIES = 'RESET_PERSONALITIES';
export const ADD_PERSONALITY = 'ADD_PERSONALITY';

export function reset() {
  return { type: RESET_PERSONALITIES };
}

export function addPersonality(payload) {
  return {
    type: ADD_PERSONALITY,
    payload,
  };
}

const initialState = { chosenPersonalities: [] };

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_PERSONALITY:
      return {
        chosenPersonalities: [...state.chosenPersonalities, action.payload],
      };
    case RESET_PERSONALITIES:
      return {
        chosenPersonalities: [],
      };
    default:
      return state;
  }
}
