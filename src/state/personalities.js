export const UPDATE_PERSONALITIES = 'UPDATE_PERSONALITIES';
export const RESET_PERSONALITIES = 'RESET_PERSONALITIES';

/**
 * Reset personality state to initial values
 * @returns {{type: string}}
 */
export function reset() {
  return { type: RESET_PERSONALITIES };
}

export function add(personalities) {
  return {
    type: UPDATE_PERSONALITIES,
    chosenPersonalities: personalities,
  };
}

export default function(state = null, action) {
  switch (action.type) {
    case RESET_PERSONALITIES:
      return {
        chosenPersonalities: [],
      };
    case UPDATE_PERSONALITIES:
      return {
        chosenPersonalities: action.chosenPersonalities,
      };
    default:
      return {
        chosenPersonalities: state ? state.chosenPersonalities : [],
      };
  }
}
