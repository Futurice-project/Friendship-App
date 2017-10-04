import React from 'react';
import { StackNavigator } from 'react-navigation';
// ## View Imports ##
import Tabs from './Tabs';
import SettingsView from '../views/Settings';
import WelcomeView from '../views/Welcome';
import PeopleView from './../views/PeopleList';
import TextInputView from '../views/TextInput';
import DropDownView from '../views/DropDown';
import SignUpLocation from '../views/SignUpLocation';

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
    SignUpLocation: { screen: SignUpLocation },
    DropDown: { screen: DropDownView }, //Test view for my DropDown Component
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
    Tabs: {
      screen: Tabs,
      navigationOptions: { title: 'Friendship App' },
    },
    // ## End StackNavigator Views ##
  },
  StackNavigatorConfig,
);
