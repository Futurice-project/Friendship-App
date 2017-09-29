import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Header from './Header';

// ## View Imports ##
import Tabs from './Tabs';
import SettingsView from '../views/Settings';
import WelcomeView from '../views/Welcome';
import PeopleView from './../views/PeopleView';
import LoginView from '../views/Login';
import ProfileUser from './../views/ProfileUser';
import ChatView from '../views/ChatView';

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
      screen: LoginView,
      navigationOptions: { title: 'SignUp Page' },
    },
    ProfileUser: {
      screen: ProfileUser,
      navigationOptions: { title: 'Profile page' },
    },
    ChatView: {
      screen: ChatView,
    },
    // ## End StackNavigator Views ##
  },
  StackNavigatorConfig,
);
