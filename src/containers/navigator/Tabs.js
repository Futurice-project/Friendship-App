import React from 'react';
import { TabNavigator } from 'react-navigation';
import { IconImage } from '../../components/Layout/Layout';

import StackChat from './StackChat';
import SearchView from '../views/SearchView';
import FollowingView from '../views/FollowingView';
import InboxView from '../views/Chat/ChatInbox';
import MyProfile from '../views/MyProfileView';

const tabNavigationOptions = title => {
  switch (title) {
    case 'Search':
      return {
        title,
        tabBarIcon: ({ tintColor }) => (
          <IconImage
            source={require('../../../assets/tab-icon-search.png')}
            tintColor={tintColor}
          />
        ),
      };
    case 'Following':
      return {
        title,
        tabBarIcon: ({ tintColor }) => (
          <IconImage
            source={require('../../../assets/tab-icon-following.png')}
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
    case 'MyProfile':
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
    Search: {
      screen: SearchView,
      navigationOptions: tabNavigationOptions('Search'),
    },
    Following: {
      screen: FollowingView,
      navigationOptions: tabNavigationOptions('Following'),
    },
    Inbox: {
      screen: StackChat,
      navigationOptions: tabNavigationOptions('Inbox'),
    },
    MyProfile: {
      screen: MyProfile,
      navigationOptions: tabNavigationOptions('MyProfile'),
    },
  },
  TabNavigatorConfig,
);
