import { combineReducers } from 'redux';
import { reducers as restReducers } from '../utils/rest';
// ## Reducer Imports ##
import NavigatorStateReducer from '../state/navigator';
import KeyboardStateReducer from '../state/keyboard';
import { reducer as formReducer } from 'redux-form';

const reducers = {
  // ## Reducers ##

  // Navigator state
  navigatorState: NavigatorStateReducer,
  keyboardState: KeyboardStateReducer,
  form: formReducer,
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
