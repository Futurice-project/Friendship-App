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
import SearchList from './../views/Search';
import EmojiPickerView from './../views/EmojiPicker';
import LookingFor from './../views/LookingFor';

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
    LookingFor: { screen: LookingFor },
    Tabs: {
      screen: Tabs,
      navigationOptions: { title: 'Friendship App' },
    },
    EmojiPicker: {
      screen: EmojiPickerView,
      navigationOptins: { title: 'Emoji Picker' },
    },
    People: {
      screen: PeopleView,
      navigationOptions: { title: 'People page' },
    },
    SearchList: {
      screen: SearchList,
      navigationOptions: { title: 'Search page' },
    },
    Settings: {
      screen: SettingsView,
      navigationOptions: { title: 'Setting page' },
    },
    SignUp: {
      screen: LoginView,
      navigationOptions: { title: 'SignUp Page' },
    },
    ProfileUser: {
      screen: ProfileUser,
      navigationOptions: { title: 'Profile page' },
    },
    // ## End StackNavigator Views ##
  },
  StackNavigatorConfig,
);
