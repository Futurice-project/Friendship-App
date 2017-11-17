import React from 'react';
import { NavigationActions, addNavigationHelpers } from 'react-navigation';
import { connect } from 'react-redux';

import RootNavigator from './Stack';

// Throw a helpful error message when the TabNavigator couldn't be found by name
const missingTabNavigator = `Error while handling back button press:

Route with name 'Tabs' was not found in the root of the navigation state.

If you have moved the 'Tabs' route, you need to:
  * Edit src/modules/Navigator.js
  * Update handleBackButton() so it knows
    where to find your TabNavigator
    (or make it ignore tabs altogether)`;

/**
 * Override the back button
 * Return true if you handle the back button yourself
 * Return false if you want the OS to handle the back button (close the app)
 * @param navigatorState
 * @param dispatch
 * @returns {boolean}
 */
export const handleBackButton = ({ navigatorState }, dispatch) => {
  const tabNavigatorIndex = navigatorState.routes.findIndex(
    route => route.routeName === 'Tabs',
  );

  // If the tab navigator is missing
  if (tabNavigatorIndex === -1) {
    if (navigatorState.routes.length == 1) {
      // We are on the homescreen, so we want the os to handle the back button
      // Pressing the back button will then close the app
      return false;
    }
    // We are not on the homescreen, we want to go back in the stack
    // We return true because we handle the navigation ourselfs
    dispatch(NavigationActions.back());
    return true;
  }

  const currentTab = navigatorState.routes[tabNavigatorIndex];
  const currentStackScreen = navigatorState;

  if (currentTab.index !== 0 || currentStackScreen.index !== 0) {
    dispatch(NavigationActions.back());
    return true;
  }

  // otherwise let OS handle the back button action
  return false;
};

const mapStateToProps = ({ navigatorState }) => ({ navigatorState });

export class NavigatorView extends React.Component {
  render = () => (
    <RootNavigator
      navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.navigatorState,
      })}
    />
  );
}

export { RootNavigator };

export default connect(mapStateToProps)(NavigatorView);
