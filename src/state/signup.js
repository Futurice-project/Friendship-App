// Reducer for progression bar
export const INC_PROGRESS = 'INC_PROGRESS';
export const DEC_PROGRESS = 'DEC_PROGRESS';
export const RESET_PROGRESS = 'RESET_PROGRESS';

export const UPDATE_EMOJI = 'UPDATE_EMOJI';
export const UPDATE_USERNAME = 'UPDATE_USERNAME';

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

export function updateUsername(payload) {
  return {
    type: UPDATE_USERNAME,
    payload,
  };
}

export function updateEmoji(payload) {
  return {
    type: UPDATE_EMOJI,
    payload,
  };
}

const initialState = {
  signupProgress: 1,
  userInfos: {
    email: '',
    emoji: null,
    password: '',
    username: '',
    birthyear: '',
    genders: '',
    loading: false,
    error: false,
    validationError: '',
  },
  selectedLocations: [],
  chosenPersonalities: [],
  choseTags: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case INC_PROGRESS:
      state.signupProgress++;
      break;
    case DEC_PROGRESS:
      state.signupProgress--;
      break;
    case UPDATE_EMOJI:
      state.userInfos.emoji = action.payload;
      break;
    case UPDATE_USERNAME:
      state.userInfos.username = action.payload;
      break;
  }
  return { ...state };
}
