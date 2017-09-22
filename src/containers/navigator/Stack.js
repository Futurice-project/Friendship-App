import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Header from './Header';

// ## View Imports ##
import Tabs from './Tabs';
import SettingsView from '../views/Settings';
import WelcomeView from '../views/Welcome';

const StackNavigatorConfig = {
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#39babd',
      elevation: 0, // disable header elevation when TabNavigator visible
    },
    headerTintColor: 'white',
  },
};

export default StackNavigator(
  {
    Welcome: { screen: WelcomeView },
    Tabs: {
      screen: Tabs,
      navigationOptions: { title: 'Friendship App' },
    },
    Settings: { screen: SettingsView },
    // ## End StackNavigator Views ##
  },
  StackNavigatorConfig,
);
