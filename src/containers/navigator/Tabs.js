import { TabNavigator } from 'react-navigation';
// ## View Imports ##
import TextInputView from '../views/TextInput';
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
    TextInput: { screen: TextInputView },

    // ## End TabNavigator Views ##
  },
  TabNavigatorConfig,
);
