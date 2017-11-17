export const UPDATE = 'UPDATE';
export const RESET = 'RESET';
import React from 'react';

/**
 * Reset personality state to initial values
 * @returns {{type: string}}
 */
export function reset() {
  return { type: RESET };
}

export function add(personalities) {
  return {
    type: UPDATE,
    chosenPersonalities: personalities,
  };
}

export default function(state = null, action) {
  switch (action.type) {
    case RESET:
      return {
        chosenPersonalities: [],
      };
    case UPDATE:
      return {
        chosenPersonalities: action.chosenPersonalities,
      };
    default:
      return {
        chosenPersonalities: state ? state.chosenPersonalities : [],
      };
  }

  return state;
}
