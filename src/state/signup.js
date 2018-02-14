export const INC_PROGRESS = 'INC_PROGRESS';
export const DEC_PROGRESS = 'DEC_PROGRESS';
export const RESET_PROGRESS = 'RESET_PROGRESS';

export function decrementProgress() {
  return { type: DEC_PROGRESS };
}

export function incrementProgress() {
  return {
    type: INC_PROGRESS,
  };
}

export function resetProgress() {
  return {
    type: RESET_PROGRESS,
  };
}

const initialState = { signupProgress: 1 };

export default function(state = initialState, action) {
  switch (action.type) {
    case INC_PROGRESS:
      return {
        signupProgress: state.signupProgress + 1,
      };
    case DEC_PROGRESS:
      return {
        signupProgress: state.signupProgress - 1,
      };
    case RESET_PROGRESS:
      return { signupProgress: initialState.signupProgress };
    default:
      return state;
  }
}
