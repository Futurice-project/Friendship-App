import React from 'react';
import { StackNavigator } from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator';
import Header from './Header';
// ## View Imports ##
import Tabs from './Tabs';
import WelcomeView from '../views/WelcomeView';
import PeopleView from '../views/PeopleView';
import SignInView from '../views/SignIn/SignInView';
import SignUpView from '../views/SignUp/SignUpView';
import SignUpMatching from '../views/SignUp/SignUpMatching';
import SignUpLocation from '../views/SignUp/SignUpLocation';
import SignUpPersonality from '../views/SignUp/SignUpPersonality';
import ChatView from '../views/Chat/ChatView';
import ChatRequest from '../views/Chat/ChatRequest';
import SignUpYeahAndNaah from '../views/SignUp/SignUpYeahAndNaah';
import UsersForTagView from '../views/UsersForTagView';
import EventDetailView from '../views/EventDetailView';
import EventCreateView from '../views/EventCreateView';
import EventEditView from '../views/EventEditView';
import Report from '../views/Report/Report';
import Feedback from '../views/Feedback/Feedback';
import PeopleProfileView from '../views/PeopleProfileView';
import MyProfileView from '../views/MyProfileView';

const StackNavigatorConfig = {
  navigationOptions: {
    header: props => <Header {...props} />,
    headerStyle: {
      backgroundColor: '#e8e9e8',
      elevation: 0, // disable header elevation when TabNavigator visible
    },
    headerTintColor: '#ff8a65',
  },
  transitionConfig: () => ({
    screenInterpolator: screenProps => {
      // Disable the transition animation when resetting to the welcome screen.
      if (
        screenProps.index === 0 &&
        screenProps.scene.route.routeName !== 'Welcome' &&
        screenProps.scenes.length > 2
      ) {
        return null;
      }
      // Otherwise, use the usual horizontal animation.
      return CardStackStyleInterpolator.forHorizontal(screenProps);
    },
  }),
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
    YeahAndNaah: {
      screen: SignUpYeahAndNaah,
      navigationOptions: {
        header: () => null,
      },
    },
    Tabs: {
      screen: Tabs,
      navigationOptions: { header: () => null },
    },
    UsersForTag: {
      screen: UsersForTagView,
      navigationOptions: { title: 'Search page' },
    },
    SignIn: {
      screen: SignInView,
      navigationOptions: { header: () => null },
    },
    SignUp: {
      screen: SignUpView,
      navigationOptions: { header: () => null },
    },
    SignUpPersonality: {
      screen: SignUpPersonality,
      navigationOptions: { header: () => null },
    },
    ChatView: {
      screen: ChatView,
    },
    ChatRequest: {
      screen: ChatRequest,
      navigationOptions: { header: () => null },
    },
    EventDetailView: {
      screen: EventDetailView,
      navigationOptions: { header: () => null },
    },
    EventCreateView: {
      screen: EventCreateView,
      navigationOptions: { header: () => null },
    },
    EventEditView: {
      screen: EventEditView,
      navigationOptions: { header: () => null },
    },
    Report: {
      screen: Report,
      navigationOptions: { header: () => null },
    },
    Feedback: {
      screen: Feedback,
      navigationOptions: { header: () => null },
    },
    PeopleProfileView: {
      screen: PeopleProfileView,
      navigationOptions: { header: () => null },
    },
    MyProfileView: {
      screen: MyProfileView,
      navigationOptions: { header: () => null },
    },
    // ## End StackNavigator Views ##
  },
  StackNavigatorConfig,
);
