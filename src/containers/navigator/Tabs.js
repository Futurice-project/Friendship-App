import { TabNavigator } from 'react-navigation';

// ## View Imports ##
import LoginView from '../views/Login';
import WelcomeView from '../views/Welcome';
//import PeopleView from '../views/PeopleList';

const TabNavigatorConfig = {
  tabBarOptions: {
    activeTintColor: 'white',
    style: { backgroundColor: '#39babd' },
    scrollEnabled: true,
  },
};

export default TabNavigator(
  {
    Welcome: { screen: WelcomeView },
    //People:{ screen: PeopleView}
    Login: { screen: LoginView },

    // ## End TabNavigator Views ##
  },
  TabNavigatorConfig,
);
