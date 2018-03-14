export const INC_PROGRESS = 'INC_PROGRESS';
export const DEC_PROGRESS = 'DEC_PROGRESS';

export function decrementProgress() {
  return { type: DEC_PROGRESS };
}

export function incrementProgress() {
  return { type: INC_PROGRESS };
}

export default function(state = { page: 1 }, action) {
  switch (action.type) {
    case INC_PROGRESS:
      return state.page + 1;
    case DEC_PROGRESS:
      return state.page + 1;
  }
}
