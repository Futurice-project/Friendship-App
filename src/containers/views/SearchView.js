import React from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, FlatList, View } from 'react-native';
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

export class SearchView extends React.Component {
  state = {
    userData: [],
    searchedUsername: '',
    currentPage: 0,
  };

  componentDidMount() {
    this.redirectWhenNotLoggedIn();
    this.fetchUsersForPage(this.state.currentPage);
  }

  componentWillReceiveProps(nextProps) {
    this.setStateWithUsersData(nextProps);
  }

  redirectWhenNotLoggedIn = () => {
    if (!this.props.auth.data.decoded) {
      this.props.redirectToWelcomeScreen();
    }
  };

  setStateWithUsersData = nextProps => {
    if (
      nextProps.usersByPage.data.data &&
      nextProps.usersByPage.data.data !== this.props.usersByPage.data.data
    ) {
      this.setState({
        userData: [...this.state.userData, ...nextProps.usersByPage.data.data],
      });
    }
  };

  // fetch 10 users and add them to the state.data
  fetchUsersForPage = currentPage => {
    this.props.fetchUsersByPage(currentPage);
    this.setState({ currentPage: this.state.currentPage + 1 });
  };

  //this variable prevent handleEnd() to be called during the first render (know RN bug)
  onEndReachedCalledDuringMomentum = true;

  handleEnd = () => {
    if (!this.onEndReachedCalledDuringMomentum) {
      // fetch 10 more users from the db
      this.fetchUsersForPage(this.state.currentPage);
      this.onEndReachedCalledDuringMomentum = true;
    }
  };

  // Creates a throttled function that only invokes refreshUsersSearch at most once per every 1 second.
  getUserByUsername = throttle(username => {
    this.setState({ searchedUsername: username });
    this.props.refreshUsersSearch(username);
  }, 1000);

  renderPeopleList() {
    const data =
      this.state.searchedUsername.length > 0
        ? this.props.usersSearch.data
        : this.state.userData;
    return (
      <View>
        <RoundTab tint="#ffffff" title="PEOPLE" />
        <Centered style={{ paddingBottom: 45, backgroundColor: '#fff' }}>
          <FlatList
            data={data}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) => <Person box data={item} />}
            onEndReached={this.handleEnd}
            onEndReachedThreshold={0.4}
            onMomentumScrollBegin={() => {
              this.onEndReachedCalledDuringMomentum = false;
            }}
            horizontal
          />
        </Centered>
      </View>
    );
  }

  render() {
    return (
      <ViewContainerTop style={{ backgroundColor: '#e8e9e8' }}>
        <SearchBar
          lightTheme
          containerStyle={{
            backgroundColor: '#e8e9e8',
            borderTopColor: '#e8e9e8',
            borderBottomColor: '#e8e9e8',
            marginVertical: 10,
            marginHorizontal: 5,
          }}
          inputStyle={{ backgroundColor: '#fff' }}
          onChangeText={username => this.getUserByUsername(username)}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Search People"
          clearIcon
        />
        {!this.props.usersByPage.data.data ? (
          <ActivityIndicator />
        ) : (
          this.renderPeopleList()
        )}
      </ViewContainerTop>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchView);
