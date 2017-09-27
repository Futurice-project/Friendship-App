import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Header from './Header';

// ## View Imports ##
import Tabs from './Tabs';
import SettingsView from '../views/Settings';
import WelcomeView from '../views/Welcome';
import PeopleView from './../views/PeopleList';
import TextInputView from '../views/TextInput';

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
    People: {
      screen: PeopleView,
      navigationOptions: { title: 'People page' },
    },
    Settings: {
      screen: SettingsView,
      navigationOptions: { title: 'Settings page' },
    },
    SignUp: {
      screen: TextInputView,
      navigationOptions: { title: 'SignUp Page' },
    },
    // ## End StackNavigator Views ##
  },
  StackNavigatorConfig,
);
