import { AsyncStorage } from 'react-native';
import { persistStore } from 'redux-persist';
import rest from './rest';

const persistConfig = {
  storage: AsyncStorage,

  // blacklisted reducers, useful when debugging to recover from broken state
  blacklist: [
    'navigatorState',
    'users',
    'usersByPage',
    'usersSearch',
    'userDetails',
    'tagsForUser',
    'errorState',
  ],
};

export default (store, callback) =>
  persistStore(store, persistConfig, callback);
