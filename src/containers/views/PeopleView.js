import React from 'react';
import { connect } from 'react-redux';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { SearchBar } from 'react-native-elements';

import { Title } from '../../components/Text';
import {
  ViewContainerTop,
  Centered,
  FullscreenCentered,
  IconImage,
  SmallHeader,
} from '../../components/Layout';
import rest from '../../utils/rest';
import Person from '../../components/Person';
import Tag from '../../components/Tags';

const mapStateToProps = state => ({
  usersSearch: state.usersSearch,
});

const mapDispatchToProps = dispatch => ({
  refreshUsersSearch: username =>
    dispatch(rest.actions.usersSearch.get({ username })),
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
      // there is an error when we change and delete the text in the search bar

      // fetch 10 more users from the db
      this.fetchData();
      this.onEndReachedCalledDuringMomentum = true;
    }
  };

  getUserByUsername(username) {
    this.setState({ searchedUsername: username });
    this.props.refreshUsersSearch(username);
  }

  renderPeople() {
    if (this.props.usersSearch.loading) {
      return <ActivityIndicator />;
    }
    return (
      <View>
        <SmallHeader> People </SmallHeader>
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
          }}
          inputStyle={{ backgroundColor: '#f1f1f3' }}
          onChangeText={username => this.getUserByUsername(username)}
          placeholder="Search"
          clearIcon
        />
        {this.renderPeople()}
      </ViewContainerTop>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PeopleView);
