import { AsyncStorage } from 'react-native';
import { persistStore } from 'redux-persist';

const persistConfig = {
  storage: AsyncStorage,

  // blacklisted reducers, useful when debugging to recover from broken state
  blacklist: [
    'navigatorState',
    'userDetails',
    'chatRooms',
    'chatRoomMessages',
    'sendMessage',
  ],
};

export default (store, callback) =>
  persistStore(store, persistConfig, callback);
