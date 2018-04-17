import React from 'react';
import { TabNavigator } from 'react-navigation';
import { IconImage } from '../../components/Layout/Layout';

import InboxChat from './InboxChat';
import PeopleChat from './PeopleChat';
import PeopleView from '../views/PeopleView';
import InboxView from '../views/Chat/ChatInbox';
import MyProfile from '../views/MyProfileView';
import EventsView from '../views/EventsView';
import {
  Chat,
  Events,
  People,
  Profile,
  Chat_selected,
  Events_selected,
  People_selected,
  Profile_selected,
} from '../../../assets/tabIcons';

const tabNavigationOptions = title => {
  switch (title) {
    case 'People':
      return {
        title,
        tabBarIcon: ({ focused, tintColor }) => (
          <IconImage source={focused ? People_selected : People} />
        ),
      };
    case 'Inbox':
      return {
        title,
        tabBarIcon: ({ focused, tintColor }) => (
          <IconImage source={focused ? Chat_selected : Chat} />
        ),
      };
    case 'Profile':
      return {
        title,
        tabBarIcon: ({ focused, tintColor }) => (
          <IconImage source={focused ? Profile_selected : Profile} />
        ),
      };
    case 'Events':
      return {
        title,
        tabBarIcon: ({ focused, tintColor }) => (
          <IconImage source={focused ? Events_selected : Events} />
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
    People: {
      screen: PeopleChat,
      navigationOptions: tabNavigationOptions('People'),
    },
    Events: {
      screen: EventsView,
      navigationOptions: tabNavigationOptions('Events'),
    },
    Inbox: {
      screen: InboxChat,
      navigationOptions: tabNavigationOptions('Inbox'),
    },
    MyProfile: {
      screen: MyProfile,
      navigationOptions: tabNavigationOptions('Profile'),
    },
  },
  TabNavigatorConfig,
);
