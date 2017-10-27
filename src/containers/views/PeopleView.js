import React from 'react';
import { connect } from 'react-redux';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import { NavigationActions } from 'react-navigation';
import rest from '../../utils/rest';
import { SearchBar } from 'react-native-elements';
import throttle from 'lodash/throttle';

import { Title, Header, SmallHeader, Description } from '../../components/Text';
import { profileData } from '../../Data/DummyProfile';
import { ViewContainerTop, Centered, IconImage } from '../../components/Layout';
import Person from '../../components/Person';
import Tag from '../../components/Tags';
import RoundTab from '../../components/RoundTab';

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
      .catch(err => console.error(err + ' error fetchData in peopleView.js'));
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
    // console.log(JSON.stringify(this.props.usersSearch.data));

    if (this.props.auth.data.token) {
      data =
        this.state.searchedUsername.length > 0
          ? this.props.usersSearch.data
          : this.state.data;
    } else {
      // for the preview
      data = profileData;
    }

    if (this.props.usersSearch.loading) {
      return <ActivityIndicator />;
    }
    return (
      <View>
        <RoundTab tint="#ffffff" title="PEOPLE" />
        <Centered style={{ paddingBottom: 45, backgroundColor: '#fff' }}>
          <FlatList
            data={data}
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

  renderSearchBar() {
    if (!this.props.auth.data.token) return null;
    return (
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
    );
  }

  render() {
    return (
      <ViewContainerTop style={{ backgroundColor: '#e8e9e8' }}>
        {this.renderSearchBar()}
        {this.renderPeople()}
      </ViewContainerTop>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PeopleView);
