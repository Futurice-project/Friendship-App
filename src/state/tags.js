export const UPDATE_TAGS = 'UPDATE_TAGS';
export const RESET_TAGS = 'RESET_TAGS';

/**
 * Reset tag state to initial values
 * @returns {{type: string}}
 */
export function reset() {
  return { type: RESET_TAGS };
}

export function update(tags) {
  return {
    type: UPDATE_TAGS,
    chosenTags: tags,
  };
}

export default function(state = null, action) {
  switch (action.type) {
    case RESET_TAGS:
      return {
        chosenTags: [],
      };
    case UPDATE_TAGS:
      return {
        chosenTags: action.chosenTags,
      };
    default:
      return {
        chosenTags: state ? state.chosenTags : [],
      };
  }
}
