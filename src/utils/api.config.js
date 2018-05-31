import { Platform } from 'react-native';

let apiRoot;
/**
 * If you want to test the app in your own phone, in case of an iPhone,
 * change the IP Address here after.
 * */
if (process.env.NODE_ENV === 'development') {
  apiRoot =
    Platform.OS === 'ios' ? 'http://10.3.1.174:3888' : 'http://10.3.1.174:3888';
} else {
  apiRoot = 'https://friendshipapp-backend.herokuapp.com';
}

export default apiRoot;
