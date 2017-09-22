import React from 'react';
import { BackHandler, ActivityIndicator, StatusBar, View } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import persistStore from './src/utils/persist';
import Navigator, {
  handleBackButton,
} from './src/containers/navigator/Navigator';
import {
  Centered,
  FullscreenCentered,
  AppContainer,
} from './src/components/Layout';
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
      'nunito-sans-regular': require('./assets/fonts/NunitoSans/NunitoSans-Regular.ttf'),
    });
    this.setState({ fontLoaded: true });
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
