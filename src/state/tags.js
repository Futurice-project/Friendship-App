export const UPDATE = 'UPDATE';
export const RESET = 'RESET';
import React from 'react';

/**
 * Reset tag state to initial values
 * @returns {{type: string}}
 */
export function reset() {
  return { type: RESET };
}

export function update(tags) {
  return {
    type: UPDATE,
    chosenTags: tags,
  };
}

export default function(state = null, action) {
  switch (action.type) {
    case RESET:
      return {
        chosenTags: [],
      };
    case UPDATE:
      return {
        chosenTags: action.chosenTags,
      };
    default:
      return {
        chosenTags: state ? state.chosenTags : [],
      };
  }

  return state;
}
