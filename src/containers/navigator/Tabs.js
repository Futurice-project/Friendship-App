import { TabNavigator, TabBarBottom } from 'react-navigation';

// ## View Imports ##
import PeopleView from '../views/PeopleList';
import FollowingView from '../views/Following';
import InboxView from '../views/Inbox';
import ProfileView from '../views/Profile';

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
// demo abcbadfa
export default TabNavigator(
  {
    Search: { screen: PeopleView },
    Following: { screen: FollowingView },
    Inbox: { screen: InboxView },
    Profile: { screen: ProfileView },
    // ## End TabNavigator Views ##
  },
  TabNavigatorConfig,
);
