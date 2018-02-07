import React from 'react';
import {
  BackHandler,
  ActivityIndicator,
  Keyboard,
  Platform,
} from 'react-native';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import persistStore from './src/utils/persist';
import * as keyboard from './src/state/keyboard';
import Navigator, {
  handleBackButton,
} from './src/containers/navigator/Navigator';
import {
  FullscreenCentered,
  AppContainer,
} from './src/components/Layout/Layout';
import { Font } from 'expo';

export default class App extends React.Component {
  state = {
    rehydrated: false,
    fontLoaded: false,
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

    this.keyboardHideListener = Keyboard.addListener(
      Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide',
      this.keyboardHideListener,
    );
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShowListener,
    );
  };

  /**
   * After unmounting the view
   * we remove the keyboard listeners
   */
  componentWillUnmount() {
    this.keyboardHideListener.remove();
    this.keyboardDidShowListener.remove();
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
    this.state.rehydrated && this.state.fontLoaded ? null : (
      <FullscreenCentered>
        <ActivityIndicator size="large" />
      </FullscreenCentered>
    );

  renderApp = () =>
    this.state.rehydrated && this.state.fontLoaded ? (
      <Provider store={store}>
        <Navigator />
      </Provider>
    ) : null;

  render = () => (
    <AppContainer>
      {this.renderActivityIndicator()}
      {this.renderApp()}
    </AppContainer>
  );
}
