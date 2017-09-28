import React from 'react';
import { connect } from 'react-redux';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { NavigationActions } from 'react-navigation';
import rest from '../../utils/rest';
import { SearchBar } from 'react-native-elements';
import throttle from 'lodash/throttle';

import { Title, Header, SmallHeader, Description } from '../../components/Text';

import { ViewContainerTop, ViewContainer, Centered, FullscreenCentered, IconImage } from '../../components/Layout';
import Person from '../../components/Person';
import Tag from '../../components/Tags';
import RoundTab from '../../components/RoundTab';
import Spinner from '../../components/Spinner';

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
    loading: false,
    filteredUsers: [],
    searchedUsername: '',
    infiniteScrollStop: false,
  };

  componentDidMount() {
    this.fetchData();
  }

  // fetch 10 users and add them to the state.data
  fetchData = () => {
    this.setState({ loading: true });
    fetch('http://localhost:3888/users/page/' + this.state.currentPage)
      .then(response => {
        return response.json();
      })
      .then(response => {
        this.setState({ currentPage: this.state.currentPage + 1 });
        this.setState({ data: [...this.state.data, ...response], loading: false});
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
    this.setState({ searchedUsername: username, infiniteScrollStop: username ? true : false, });
    this.props.refreshUsersSearch(username);
  }, 1000);

  renderPeople() {
    if (this.props.usersSearch.loading) {
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

  render = () => (
    <ViewContainer>
      <Title> People </Title>
      <SearchBar
        round
        lightTheme
        onChangeText={username => this.getUserByUsername(username)}
        placeholder="Search"
      />

      <FullscreenCentered>
        <FlatList
          data={
            this.state.searchedUsername.length > 0
              ? this.state.filteredUsers
              : this.state.data
          }
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          onEndReached={this.handleEnd}
          onEndReachedThreshold={0.4}
          style={{ flex: 1 }}
          //ListFooterComponent= {() => <ActivityIndicator animating size= 'small'/>}
          horizontal
        />
        {this.renderSpinner()}
      </FullscreenCentered>
    </ViewContainer>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(PeopleView);
