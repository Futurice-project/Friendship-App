import { AsyncStorage } from 'react-native';
import { persistStore } from 'redux-persist';

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
    'personalitiesForUser',
    'currentUser',
    'tagsForCurrentUser',
    'personalitiesForCurrentUser',
    'userlistForTag',
    'chatRooms',
    'chatRoomMessages',
    'sendMessage',
    'chatRoomsWithUserId',
    'createChatRoom',
    'personalities',
    'locations',
    'createUserPersonality',
    'createUserPersonalities',
    'createUserLocations',
    'events',
    'eventDetails',
    'eventParticipants',
    'eventPersonalities',
    'eventTags',
  ],
};

export default (store, callback) =>
  persistStore(store, persistConfig, callback);
