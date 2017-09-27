import { combineReducers } from 'redux';
import { reducers as restReducers } from '../utils/rest';

// ## Reducer Imports ##
import NavigatorStateReducer from '../state/navigator';

const reducers = {
  // ## Reducers ##

  // Navigator state
  navigatorState: NavigatorStateReducer,

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