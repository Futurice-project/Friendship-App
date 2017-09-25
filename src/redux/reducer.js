import { combineReducers } from 'redux';
import { reducers as restReducers } from '../utils/rest';

// ## Reducer Imports ##
import NavigatorStateReducer from '../state/navigator';

export default combineReducers({
  // ## Reducers ##

  // Navigator state
  navigatorState: NavigatorStateReducer,

  //
  ...restReducers,
});
