import React from 'react';
import { StackNavigator } from 'react-navigation';
import Header from './Header';
// ## View Imports ##
import Tabs from './Tabs';
import WelcomeView from '../views/WelcomeView';
import SearchView from '../views/SearchView';
import SignInView from '../views/SignIn/SignInView';
import SignUpView from '../views/SignUp/SignUpView';
import ProfileUser from '../views/PeopleProfileView';
import SignUpMatching from '../views/SignUp/SignUpMatching';
import SignUpLocation from '../views/SignUp/SignUpLocation';
import SignUpPersonality from '../views/SignUp/SignUpPersonality';
import ChatView from '../views/Chat/ChatView';
import ChatRequest from '../views/Chat/ChatRequest';
import SignUpLoveAndHate from '../views/SignUp/SignUpYeahAndNaah';
import SearchList from '../views/UsersForTagView';

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
    Welcome: {
      screen: WelcomeView,
      navigationOptions: { header: () => null },
    },
    SignUpLocation: {
      screen: SignUpLocation,
      title: 'SignUpLocation',
      navigationOptions: { header: () => null },
    },
    SignUpMatching: {
      screen: SignUpMatching,
      title: 'Matching',
      navigationOptions: { header: () => null },
    },
    LoveAndHate: { screen: SignUpLoveAndHate },
    Tabs: {
      screen: Tabs,
      navigationOptions: { header: () => null },
    },
    SearchList: {
      screen: SearchList,
      navigationOptions: { title: 'Search page' },
    },
    People: {
      screen: SearchView,
      navigationOptions: { title: 'People page' },
    },
    SignIn: {
      screen: SignInView,
      navigationOptions: { title: 'SignIn Page' },
    },
    SignUp: {
      screen: SignUpView,
      navigationOptions: { title: 'SignUp Page' },
    },
    SignUpPersonality: {
      screen: SignUpPersonality,
      navigationOptions: { title: 'SignUpLocation Page' },
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
