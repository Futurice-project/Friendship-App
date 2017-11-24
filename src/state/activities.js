export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const RESET = 'RESET';
import React from 'react';

export function increment(length, endIndex) {
  if (endIndex + 2 > length) {
    return { type: RESET };
  }
  return { type: INCREMENT };
}

export function decrement() {
  return { type: DECREMENT };
}

export function reset() {
  return { type: RESET };
}

export default function(state = null, action) {
  switch (action.type) {
    case INCREMENT:
      return {
        chosenPersonalities: state.chosenPersonalities,
        startIndex: state.startIndex + 2,
        endIndex: state.endIndex + 2,
      };
    // case 'Navigation/BACK': {
    //   if(state.startIndex-2 >= 0) {
    //     return {
    //       chosenPersonalities: state.chosenPersonalities,
    //       startIndex: state.startIndex - 2,
    //       endIndex: state.endIndex - 2,
    //     }
    //   }
    // }
    case RESET:
      return {
        chosenPersonalities: [],
        startIndex: 0,
        endIndex: 2,
      };
    default:
      return {
        chosenPersonalities: [],
        startIndex: 0,
        endIndex: 2,
      };
  }

  return state;
}
