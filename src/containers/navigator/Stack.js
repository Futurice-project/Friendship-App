import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Header from './Header';

// ## View Imports ##
import Tabs from './Tabs';
import SettingsView from '../views/Settings';
import PeopleView from './../views/PeopleList';

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
    Tabs: {
      screen: Tabs,
      navigationOptions: { title: 'Welcome to Pepperoni!' },
    },
    People: { screen: PeopleView },
    // ## End StackNavigator Views ##
  },
  StackNavigatorConfig,
);
