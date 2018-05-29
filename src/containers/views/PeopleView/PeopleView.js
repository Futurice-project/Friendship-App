import React from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import rest from '../../../utils/rest';
import throttle from 'lodash/throttle';
import Background from '../../../components/Background/Background';
import PeopleList from '../../../components/PeopleList';

const mapStateToProps = state => ({
  usersSearch: state.usersSearch,
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
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

export class PeopleView extends React.Component {
  state = {
    searchedUsername: '',
  };

  componentDidMount() {
    this.redirectWhenNotLoggedIn();
    /*this.fetchUsersForPage(this.state.currentPage);*/
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
      nextProps.usersByPage &&
      nextProps.usersByPage.data &&
      nextProps.usersByPage.data !== this.props.usersByPage.data
    ) {
      this.setState({
        userData: [...this.state.userData, ...nextProps.usersByPage.data],
      });
    }
  };

  // Creates a throttled function that only invokes refreshUsersSearch at most once per every 1 second.
  getUserByUsername = throttle(username => {
    this.setState({ searchedUsername: username });
    this.props.refreshUsersSearch(username);
  }, 1000);

  render() {
    return (
      <Background color="grey">
        <PeopleList />
      </Background>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PeopleView);
