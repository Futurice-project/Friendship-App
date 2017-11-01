import { AsyncStorage } from 'react-native';
import { persistStore } from 'redux-persist';
import rest from './rest';

const persistConfig = {
  storage: AsyncStorage,

  // blacklisted reducers, useful when debugging to recover from broken state
  blacklist: [
    'navigatorState',
    'users',
    'usersUpdate',
    'usersByPage',
    'usersSearch',
    'userDetails',
    'tagsForUser',
    'currentUser',
    'tagsForCurrentUser',
  ],
};

export default (store, callback) =>
  persistStore(store, persistConfig, callback);
