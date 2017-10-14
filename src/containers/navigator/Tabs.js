import { TabNavigator, TabBarBottom } from 'react-navigation';

// ## View Imports ##

import LookingFor from '../views/LookingFor';
import PeopleView from '../views/PeopleView';
import FollowingView from '../views/Following';
import InboxView from '../views/Inbox';
import MyProfile from '../views/MyProfile';

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
    Search: { screen: PeopleView },
    Following: { screen: FollowingView },
    Inbox: { screen: InboxView },
    MyProfile: { screen: MyProfile },
    LookingFor: { screen: LookingFor },

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
