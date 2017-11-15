import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Header from './Header';

// ## View Imports ##
import Tabs from './Tabs';
import SettingsView from '../views/Settings';
import WelcomeView from '../views/Welcome';
import PeopleView from './../views/PeopleView';
import SignInView from '../views/SignInView';
import SignUpView from '../views/SignUpView';
import SignOutView from '../views/SignOutView';
import ProfileUser from './../views/ProfileUser';
import SearchList from './../views/Search';
import EmojiPickerView from './../views/EmojiPicker';
import LookingFor from './../views/LookingFor';
import Matching from './../views/Matching';
import SignUpLocation from '../views/SignUpLocation';
import SignUpPersonality from '../views/SignUpPersonality';
import ChatView from './../views/ChatView';
import ChatRequest from './../views/ChatRequest';

const StackNavigatorConfig = {
  navigationOptions: {
    header: props => <Header {...props} />,
    headerStyle: {
      backgroundColor: '#e8e9e8',
      elevation: 0, // disable header elevation when TabNavigator visible
    },
    headerTintColor: '#ff8a65',
  },
};

export default StackNavigator(
  {
    Welcome: { screen: WelcomeView },
    SignUpLocation: { screen: SignUpLocation },
    LookingFor: { screen: LookingFor },
    Matching: { screen: Matching },
    Tabs: {
      screen: Tabs,
      navigationOptions: { header: () => null },
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
    SignIn: {
      screen: SignInView,
      navigationOptions: { title: 'SignIn Page' },
    },
    SignUp: {
      screen: SignUpView,
      navigationOptions: { title: 'SignUp Page' },
    },
    SignUpLocation: {
      screen: SignUpLocation,
      navigationOptions: { title: 'SignUpLocation Page' },
    },
    SignUpPersonality: {
      screen: SignUpPersonality,
      navigationOptions: { title: 'SignUpLocation Page' },
    },
    SignOut: {
      screen: SignOutView,
      navigationOptions: { title: 'SignOut Page' },
    },
    ProfileUser: {
      screen: ProfileUser,
      navigationOptions: { header: () => null },
    },
    ChatView: {
      screen: ChatView,
    },
    ChatRequest: {
      screen: ChatRequest,
      navigationOptions: { header: () => null },
    },
    // ## End StackNavigator Views ##
  },
  StackNavigatorConfig,
);
