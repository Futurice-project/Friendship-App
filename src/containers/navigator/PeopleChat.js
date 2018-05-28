import React from 'react';
import { StackNavigator } from 'react-navigation';
import Header from './Header';
// ## View Imports ##
import ChatView from '../views/Chat/ChatView';
import ChatRequest from '../views/Chat/ChatRequest';
import PeopleView from '../views/PeopleView';
import ProfileUser from '../views/PeopleProfileView';
import HeaderContainer from '../HeaderContainer/HeaderContainer';

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

export default StackNavigator({
  People: {
    screen: PeopleView,
    navigationOptions: { header: () => null },
  },
  ChatView: {
    screen: ChatView,
    navigationOptions: {
      tabBarVisible: false,
    },
  },
  ProfileUser: {
    screen: ProfileUser,
    navigationOptions: {
      header: props => (
        <HeaderContainer left="white-back" color="transparent" {...props} />
      ),
    },
  },
  ChatRequest: {
    screen: ChatRequest,
    navigationOptions: {
      header: () => null,
      tabBarVisible: false,
    },
  },
  // ## End StackNavigator Views ##
});
