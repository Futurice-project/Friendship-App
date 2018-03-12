import React from 'react';
import { TabNavigator } from 'react-navigation';
import { IconImage } from '../../components/Layout/Layout';

import StackChat from './StackChat';
import PeopleView from '../views/PeopleView';
import InboxView from '../views/Chat/ChatInbox';
import MyProfile from '../views/MyProfileView';
import EventsView from '../views/EventsView';
import HomeView from '../views/HomeView';

const tabNavigationOptions = title => {
  switch (title) {
    case 'Home':
      return {
        title,
        tabBarIcon: ({ tintColor }) => (
          <IconImage
            source={require('../../../assets/tab-icon-home.png')}
            tintColor={tintColor}
          />
        ),
      };
    case 'People':
      return {
        title,
        tabBarIcon: ({ tintColor }) => (
          <IconImage
            source={require('../../../assets/tab-icon-people.png')}
            tintColor={tintColor}
          />
        ),
      };
    case 'Inbox':
      return {
        title,
        tabBarIcon: ({ tintColor }) => (
          <IconImage
            source={require('../../../assets/tab-icon-inbox.png')}
            tintColor={tintColor}
          />
        ),
      };
    case 'Profile':
      return {
        title,
        tabBarIcon: ({ tintColor }) => (
          <IconImage
            source={require('../../../assets/tab-icon-myprofile.png')}
            tintColor={tintColor}
          />
        ),
      };
    default:
      break;
  }
};

const TabNavigatorConfig = {
  tabBarPosition: 'bottom',
  tabBarOptions: {
    tintColor: 'black',
    activeTintColor: '#219412',
    inactiveTintColor: '#000000',
    style: {
      backgroundColor: 'white',
    },
    showIcon: true,
    labelStyle: {
      fontSize: 11,
      paddingBottom: 2,
    },
  },
};

export default TabNavigator(
  {
    Home: {
      screen: HomeView,
      navigationOptions: tabNavigationOptions('Home'),
    },
    Events: {
      screen: EventsView,
    },
    People: {
      screen: PeopleView,
      navigationOptions: tabNavigationOptions('People'),
    },
    Inbox: {
      screen: StackChat,
      navigationOptions: tabNavigationOptions('Inbox'),
    },
    MyProfile: {
      screen: MyProfile,
      navigationOptions: tabNavigationOptions('Profile'),
    },
  },
  TabNavigatorConfig,
);
