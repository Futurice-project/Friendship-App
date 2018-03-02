import React from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, FlatList, View, Text } from 'react-native';
import { NavigationActions } from 'react-navigation';
import rest from '../../utils/rest';
import { SearchBar } from 'react-native-elements';
import throttle from 'lodash/throttle';

import { Centered, ViewContainerTop } from '../../components/Layout/Layout';
import Person from '../../components/Person';
import RoundTab from '../../components/RoundTab';

const mapStateToProps = state => ({
  usersSearch: state.usersSearch,
  usersByPage: state.usersByPage,
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  fetchUsersByPage: number => {
    dispatch(rest.actions.usersByPage({ number }));
  },
  refreshUsersSearch: username => {
    /* .force() abort previous request if it performs and after that perform new request. This
    method combines abort and direct call action methods. it prevent a warning about unhandled
    promises rejection */
    dispatch(rest.actions.usersSearch.force({ username }));
  },
  redirectToWelcomeScreen: () =>
    dispatch(
      NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Welcome' })],
      }),
    ),
});

export class HomeView extends React.Component {
  state = {
    userData: [],
    searchedUsername: '',
    currentPage: 0,
  };

  render() {
    return (
      <View>
        <Text>Hello</Text>
      </View>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
