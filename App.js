import React from 'react';
import { ActivityIndicator, BackHandler, View } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import persistStore from './src/utils/persist';
import * as keyboard from './src/state/keyboard';
import Navigator, {
  handleBackButton,
} from './src/containers/navigator/Navigator';
import { FullscreenCentered } from './src/components/Layout/Layout';
import { Font, Notifications, Permissions } from 'expo';
import { MenuProvider } from 'react-native-popup-menu';
import { styles } from './src/styles';
import apiRoot from './src/utils/api.config';

export default class App extends React.Component {
  state = {
    rehydrated: false,
    fontLoaded: false,
    cameraRoll: false,
  };

  componentDidMount = async () => {
    persistStore(store, () => this.setState({ rehydrated: true }));
    BackHandler.addEventListener('hardwareBackPress', () =>
      handleBackButton(store.getState(), store.dispatch),
    );

    //  Load fonts and wait untill this is done before rendering
    await Font.loadAsync({
      'NunitoSans-Regular': require('./assets/fonts/NunitoSans/NunitoSans-Regular.ttf'),
      'NunitoSans-Bold': require('./assets/fonts/NunitoSans/NunitoSans-Bold.ttf'),
      'NunitoSans-LightItalic': require('./assets/fonts/NunitoSans/NunitoSans-LightItalic.ttf'),
      'NunitoSans-SemiBold': require('./assets/fonts/NunitoSans/NunitoSans-SemiBold.ttf'),
      'NunitoSans-ExtraBold': require('./assets/fonts/NunitoSans/NunitoSans-ExtraBold.ttf'),
      'NunitoSans-Light': require('./assets/fonts/NunitoSans/NunitoSans-Light.ttf'),
      Friendship_version_2: require('./assets/fonts/Friendship/Friendship.ttf'),
      Futurice: require('./assets/fonts/Friendship/Friendship-Regular.ttf'),
    });
    this.setState({ fontLoaded: true });

    /*this.keyboardHideListener = Keyboard.addListener(
      Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide',
      this.keyboardHideListener,
    );
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShowListener,
    );*/

    const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      this.askPermissionsAsync()
        .then(() => this.setState({ cameraRoll: true }))
        .catch(e => console.log(e));
    } else {
      this.setState({ cameraRoll: true });
    }

    this.registerForPushNotificationsAsync();
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification,
    );
  };

  _handleNotification = notification => {
    this.setState({ notification: notification });
  };

  askPermissionsAsync = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
  };

  registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS,
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();

    // POST the token to your backend server from where you can retrieve it to send push notifications.
    return fetch(`${apiRoot}/users/push-token`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token,
        userId: store.getState().auth.data.decoded.id,
      }),
    });
  };

  /**
   * After unmounting the view
   * we remove the keyboard listeners
   */
  componentWillUnmount() {
    /*this.keyboardHideListener.remove();
    this.keyboardDidShowListener.remove();*/
  }

  /**
   * When show hide of react's keyboard is fired, this function is called
   * it will call the redux reducer to handle state changes in the keyboard
   */
  keyboardHideListener = () => {
    store.dispatch(keyboard.hide());
  };

  /**
   * When show event of react's keyboard is fired, this function is called
   * it will call the redux reducer to handle state changes in the keyboard
   */
  keyboardDidShowListener = () => {
    store.dispatch(keyboard.show());
  };

  renderActivityIndicator = () =>
    this.state.rehydrated &&
    this.state.fontLoaded &&
    this.state.cameraRoll ? null : (
      <FullscreenCentered>
        <ActivityIndicator size="large" />
      </FullscreenCentered>
    );

  renderApp = () =>
    this.state.rehydrated && this.state.fontLoaded && this.state.cameraRoll ? (
      <MenuProvider>
        <Provider store={store}>
          <Navigator />
        </Provider>
      </MenuProvider>
    ) : null;

  render = () => {
    return (
      <View style={styles.rootContainer}>
        {this.renderActivityIndicator()}
        {this.renderApp()}
      </View>
    );
  };
}
