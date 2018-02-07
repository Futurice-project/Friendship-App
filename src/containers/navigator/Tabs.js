import { TabBarBottom, TabNavigator } from 'react-navigation';
import SearchView from '../views/SearchView';
import FollowingView from '../views/FollowingView';
import InboxView from '../views/Chat/ChatInbox';
import MyProfile from '../views/MyProfileView';
import EventsView from '../views/EventsView';

// ## View Imports ##

const TabNavigatorConfig = {
  tabBarOptions: {
    tintColor: 'black',
    activeTintColor: '#219412',
    inactiveTintColor: '#000000',
    style: {
      backgroundColor: 'white',
    },
    scrollEnabled: true,
    tabBarComponent: TabBarBottom,
    showIcon: true,
    labelStyle: {
      fontSize: 11,
      paddingBottom: 2,
    },
  },
};

export default TabNavigator(
  {
    Search: { screen: SearchView },
    Events: { screen: EventsView },
    Following: { screen: FollowingView },
    Inbox: { screen: InboxView },
    MyProfile: { screen: MyProfile },

    // ## End TabNavigator Views ##
  },
  {
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
  },
  TabNavigatorConfig,
);
