import { AsyncStorage } from 'react-native';
import { persistStore } from 'redux-persist';

const persistConfig = {
  storage: AsyncStorage,

  // whitelisted reducers, all the other reducer are not persisted
  whitelist: ['auth'],
};

export default (store, callback) =>
  persistStore(store, persistConfig, callback);
