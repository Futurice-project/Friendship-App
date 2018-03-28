import React from 'react';
import { TabNavigator } from 'react-navigation';
import { IconImage } from '../../components/Layout/Layout';

import InboxChat from './InboxChat';
import PeopleChat from './PeopleChat';
import PeopleView from '../views/PeopleView';
import InboxView from '../views/Chat/ChatInbox';
import MyProfile from '../views/MyProfileView';
import EventsView from '../views/EventsView';

import TabIcons from './TabIcons';
import Svg, { Path } from 'react-native-svg';

const tabNavigationOptions = title => {
  switch (title) {
    case 'People':
      return {
        title,
        tabBarIcon: ({ focused, tintColor }) => (
          <Svg width="20" height="19">
            <Path d={TabIcons[2].path} fill={focused ? '#FF8A65' : null} />
          </Svg>
        ),
      };
    case 'Inbox':
      return {
        title,
        tabBarIcon: ({ focused, tintColor }) => (
          <Svg width="20" height="19">
            <Path d={TabIcons[0].path} fill={focused ? '#FF8A65' : null} />
          </Svg>
        ),
      };
    case 'Profile':
      return {
        title,
        tabBarIcon: ({ focused, tintColor }) => (
          <Svg width="20" height="19">
            <Path d={TabIcons[3].path} fill={focused ? '#FF8A65' : null} />
          </Svg>
        ),
      };
    case 'Events':
      return {
        title,
        tabBarIcon: ({ focused, tintColor }) => (
          <Svg width="20" height="19">
            <Path d={TabIcons[1].path} fill={focused ? '#FF8A65' : null} />
          </Svg>
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
