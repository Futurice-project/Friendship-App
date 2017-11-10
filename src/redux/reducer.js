import { combineReducers } from 'redux';
import { reducers as restReducers } from '../utils/rest';

// ## Reducer Imports ##
import NavigatorStateReducer from '../state/navigator';
import PersonalityStateReducer from '../state/personalities';

const reducers = {
  // ## Reducers ##

  // Navigator state
  navigatorState: NavigatorStateReducer,
  personalityState: PersonalityStateReducer,

  //
  ...restReducers,
};

const appReducer = combineReducers(reducers);
const rootReducer = (state, action) => {
  if (action.type === 'SIGN_OUT') {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
