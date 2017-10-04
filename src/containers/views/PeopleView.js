import React from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import {
  Image,
  View,
  Text,
  FlatList,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { List, ListItem, SearchBar } from 'react-native-elements';
import { PepperoniLogo, IconButton } from '../../components/Pepperoni';
import { Title, Description, Bold } from '../../components/Text';
import {
  ViewContainer,
  ViewContainerTop,
  ViewContainerLight,
  Centered,
  FlexRow,
  IconImage,
} from '../../components/Layout';
import rest from '../../utils/rest';
import Person from '../../components/Person';
import TabProfile from '../../components/TabProfile';

const mapStateToProps = state => ({
  usersSearch: state.usersSearch,
  usersByPage: state.usersByPage,
});

const mapDispatchToProps = dispatch => ({
  refreshUsersSearch: username =>
    dispatch(rest.actions.usersSearch.get({ username })),
  refreshUsersByPage: page => dispatch(rest.actions.usersByPage.get({ page })),
});

export class PeopleView extends React.Component {
  static navigationOptions = {
    title: 'Search',
    tabBarIcon: ({ tintColor }) => (
      <IconImage
        source={require('../../../assets/search0.png')}
        tintColor={tintColor}
      />
    ),
  };

  state = {
    data: {},
    page: 0,
    loading: false,
    filteredUsers: [],
    searchedUsername: '',
  };

  keyExtractor = item => item.id;
  renderItem = ({ item }) => <Person color="#939795" data={item} />;

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    //this.setState({ loading: true });
    //if (this.state.page)
    await this.props.refreshUsersByPage(this.state.page);
    this.setState(state => ({
      data: [...state.data, ...this.props.usersByPage.data.data],
      //loading: false,
    }));
    // const response = await fetch(
    //   `http://0.0.0.0:3888/users/page/${this.state.page}`,
    //   {
    //     method: 'get',
    //     headers: {
    //       Authorization:
    //         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmb29AYmFyLmNvbSIsInNjb3BlIjoidXNlciIsImlhdCI6MTUwNDg2NDg0OH0.jk2cvlueBJTWuGB0VMjYnbUApoDua_8FrzogDXzz9iY',
    //     },
    //   },
    // );
    // const json = await response.json();
    // this.setState(state => ({
    //   data: [...state.data, ...json],
    //   loading: false,
    // }));
  };

  handleEnd = () => {
    this.setState(
      state => ({ page: this.state.page + 1 }),
      () => this.fetchData(),
    );
  };

  getUserByUsername(username) {
    this.setState({ searchedUsername: username });
    this.props.refreshUsersSearch(username);
  }

  renderPeople() {
    //console.log();
    if (this.props.usersSearch.loading) {
      return <ActivityIndicator />;
    }
    return (
      <ViewContainerLight>
        <Title> People </Title>
        <Centered>
          <FlatList
            data={
              this.state.searchedUsername.length > 0 ? (
                this.props.usersSearch.data
              ) : (
                this.state.data
              )
            }
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
            onEndReached={this.handleEnd}
            onEndReachedThreshold={0.4}
            //ListFooterComponent= {() => <ActivityIndicator animating size= 'small'/>}
            horizontal
          />
        </Centered>
      </ViewContainerLight>
    );
  }

  render = () => {
    console.log('1searchedUsername ' + this.state.searchedUsername);
    console.dir('2state.data ' + this.state.data);
    console.dir('3props usersByPage ' + this.props.usersByPage.data);
    console.dir('4props usersByPage loading ' + this.props.usersByPage.loading);
    console.dir('5state.page ' + this.state.page);
    return (
      <ViewContainerTop>
        <SearchBar
          round
          lightTheme
          placeholder="Search"
          onChangeText={username => {
            this.getUserByUsername(username);
          }}
        />
        {this.renderPeople()}
      </ViewContainerTop>
    );
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PeopleView);
