import React from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, FlatList, View } from 'react-native';
import rest from '../../utils/rest';
import { SearchBar } from 'react-native-elements';
import throttle from 'lodash/throttle';

import {
  Centered,
  IconImage,
  ViewContainerTop,
} from '../../components/Layout/Layout';
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
});

export class SearchView extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <IconImage
        source={require('../../../assets/search0.png')}
        tintColor={tintColor}
      />
    ),
  };

  state = {
    data: [],
    searchedUsername: '',
    currentPage: 0,
  };

  componentDidMount() {
    this.fetchData(this.state.currentPage);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.usersByPage.data.data &&
      nextProps.usersByPage.data.data !== this.props.usersByPage.data.data
    ) {
      this.setState({
        data: [...this.state.data, ...nextProps.usersByPage.data.data],
      });
    }
  }

  // fetch 10 users and add them to the state.data
  fetchData = currentPage => {
    this.props.fetchUsersByPage(currentPage);
    this.setState({ currentPage: this.state.currentPage + 1 });
  };

  handleEnd = () => {
    if (!this.onEndReachedCalledDuringMomentum) {
      // fetch 10 more users from the db
      this.fetchData(this.state.currentPage);
      this.onEndReachedCalledDuringMomentum = true;
    }
  };

  // Creates a throttled function that only invokes func at most once per every 1 second.
  getUserByUsername = throttle(username => {
    this.setState({ searchedUsername: username });
    this.props.refreshUsersSearch(username);
  }, 1000);

  renderPeople() {
    if (this.props.usersSearch.loading && this.props.usersByPage.loading) {
      return <ActivityIndicator />;
    }
    return (
      <View>
        <RoundTab tint="#ffffff" title="PEOPLE" />
        <Centered style={{ paddingBottom: 45, backgroundColor: '#fff' }}>
          <FlatList
            data={
              this.state.searchedUsername.length > 0 ? (
                this.props.usersSearch.data
              ) : (
                this.state.data
              )
            }
            keyExtractor={item => item.id}
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
        {this.renderPeople()}
      </ViewContainerTop>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchView);
