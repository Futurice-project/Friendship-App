// Actions for progression bar
export const INC_PROGRESS = 'INC_PROGRESS';
export const DEC_PROGRESS = 'DEC_PROGRESS';
export const RESET_PROGRESS = 'RESET_PROGRESS';

// Actions for the SignUpView
export const UPDATE_EMOJI = 'UPDATE_EMOJI';
export const UPDATE_USERNAME = 'UPDATE_USERNAME';
export const UPDATE_EMAIL = 'UPDATE_EMAIL';
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
export const UPDATE_BIRTHYEAR = 'UPDATE_BIRTHYEAR';
export const UPDATE_IMAGE = 'UPDATE_IMAGE';
export const ADD_GENDER = 'ADD_GENDER';
export const REMOVE_GENDER = 'REMOVE_GENDER';
export const UPDATE_VALIDATION_ERROR = 'UPDATE_VALIDATION_ERROR';
export const UPDATE_ERROR = 'UPDATE_ERROR';

const initialState = {
  signupProgress: 1,
  userInfos: {
    email: '',
    emoji: null,
    password: '',
    username: ' ',
    birthyear: '',
    genders: [],
    image: null,
    loading: false,
    error: false,
    validationError: '',
  },
  selectedLocations: [],
  chosenPersonalities: [],
  choseTags: [],
};

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

export function updateUserInfos(payload, actionType) {
  return {
    type: actionType,
    payload,
  };
}

export default function(state = initialState, action) {
  switch (action.type) {
    case INC_PROGRESS:
      state.signupProgress++;
      break;
    case DEC_PROGRESS:
      state.signupProgress--;
      break;
    case UPDATE_EMOJI:
      state.userInfos.avatar = action.payload;
      break;
    case UPDATE_USERNAME:
      state.userInfos.username = action.payload;
      break;
    case UPDATE_EMAIL:
      state.userInfos.email = action.payload;
      break;
    case UPDATE_PASSWORD:
      state.userInfos.password = action.payload;
      break;
    case UPDATE_BIRTHYEAR:
      state.userInfos.birthyear = action.payload;
      break;
    case ADD_GENDER:
      state.userInfos.genders = [...state.userInfos.genders, action.payload];
      break;
    case REMOVE_GENDER:
      const genders = state.userInfos.genders.slice();
      genders.splice(state.userInfos.genders.indexOf(action.payload), 1);
      state.userInfos.genders = genders;
      break;
    case UPDATE_IMAGE:
      state.userInfos.image = action.payload;
      break;
    case UPDATE_VALIDATION_ERROR:
      state.userInfos.validationError = action.payload;
      break;
    case UPDATE_ERROR:
      state.userInfos.error = action.payload;
      break;
  }
  return { ...state };
}
