import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Header from './Header';

// ## View Imports ##
import WelcomeView from '../views/Welcome';
import Tabs from './Tabs';
import SettingsView from '../views/Settings';
import PeopleView from './../views/PeopleView';
import ProfileUser from './../views/ProfileUser';

const StackNavigatorConfig = {
  navigationOptions: {
    header: props => <Header {...props} />,
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
      navigationOptions: { title: 'Welcome to Pepperoni!' },
    },
    Settings: {
      screen: SettingsView,
      navigationOptions: { title: 'Settings page' },
    },
    ProfileUser: {
      screen: ProfileUser,
      navigationOptions: { title: 'Profile page' },
    },
    // ## End StackNavigator Views ##
  },
  StackNavigatorConfig,
);
