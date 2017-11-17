export const HIDE = 'HIDE';
export const SHOW = 'SHOW';
import React from 'react';

/**
 * Creates a new key every time there is a change on the keyboard
 * This will solve the white space after clicking on a text input
 * Because of the key it will recognize a change (key = different each time)
 */
export function hide(e) {
  return { type: HIDE };
}

/**
 * Every time the keyboard opens we want to set this in the state
 * this way we can render accordingly
 */
export function show(e) {
  return { type: SHOW };
}

export default function(state = null, action) {
  switch (action.type) {
    case HIDE:
      return {
        keyboardOpen: false,
      };
    case SHOW:
      return {
        keyboardKey: new Date().getTime(),
        keyboardOpen: true,
      };
  }

  return state;
}
