import React from 'react';
import { connect } from 'react-redux';
import { View, FlatList, ActivityIndicator } from 'react-native';
<<<<<<< HEAD
import { SearchBar } from 'react-native-elements';
import throttle from 'lodash/throttle';
=======
import { NavigationActions } from 'react-navigation';
import rest from '../../utils/rest';
import { SearchBar } from 'react-native-elements';

import { Title, Header, SmallHeader, Description } from '../../components/Text';
>>>>>>> Css cleaning up and minor changes.
import {
  ViewContainerTop,
  Centered,
  IconImage,
} from '../../components/Layout';
import Person from '../../components/Person';

const mapStateToProps = state => ({
  usersSearch: state.usersSearch,
});

const mapDispatchToProps = dispatch => ({
  refreshUsersSearch: username => {
    /* .force() abort previous request if it performs and after that perform new request. This
    method combines abort and direct call action methods. it prevent a warning about unhandled
    promises rejection */
    dispatch(rest.actions.usersSearch.force({ username }));
  },
});

export class PeopleView extends React.Component {
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
    this.fetchData();
  }

  // fetch 10 users and add them to the state.data
  fetchData = () => {
    fetch('http://localhost:3888/users/page/' + this.state.currentPage)
      .then(response => {
        return response.json();
      })
      .then(response => {
        this.setState({ currentPage: this.state.currentPage + 1 });
        this.setState({ data: [...this.state.data, ...response] });
      })
      .catch(err => console.error(err + 'error fetchData in peopleView.js'));
  };

  handleEnd = () => {
    if (!this.onEndReachedCalledDuringMomentum) {
      // fetch 10 more users from the db
      this.fetchData();
      this.onEndReachedCalledDuringMomentum = true;
    }
  };

  // Creates a throttled function that only invokes func at most once per every 1 second.
  getUserByUsername = throttle(username => {
    this.setState({ searchedUsername: username });
    this.props.refreshUsersSearch(username);
  }, 1000);

  renderPeople() {
    if (this.props.usersSearch.loading) {
      return <ActivityIndicator />;
    }
    return (
      <View>
        <Header> PEOPLE </Header>
        <Centered>
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
      <ViewContainerTop>
        <SearchBar
          lightTheme
          containerStyle={{
            backgroundColor: '#fff',
            borderTopColor: '#fff',
            borderBottomColor: '#fff',
            marginVertical: 10,
            marginHorizontal: 5,
          }}
          inputStyle={{ backgroundColor: '#f1f1f3' }}
          onChangeText={username => this.getUserByUsername(username)}
          placeholder="Search"
          autoCapitalize="none"
          autoCorrect={false}
          clearIcon
        />
        {this.renderPeople()}
      </ViewContainerTop>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PeopleView);
