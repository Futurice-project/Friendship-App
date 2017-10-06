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
    data: [],
    searchedUsername: '',
  };

  currentPage = 0;

  keyExtractor = item => item.id;
  renderItem = ({ item }) => <Person color="#939795" data={item} />;

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    this.props.refreshUsersByPage(this.currentPage).then(response => {
      this.currentPage += 1;
      this.setState({ data: [...this.state.data, ...response.data] });
    });
  };

  handleEnd = () => {
    if (!this.onEndReachedCalledDuringMomentum) {
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
            onEndReachedThreshold={0.001}
            onMomentumScrollBegin={() => {
              this.onEndReachedCalledDuringMomentum = false;
            }}
            //ListFooterComponent= {() => <ActivityIndicator animating size= 'small'/>}
            horizontal
          />
        </Centered>
      </ViewContainerLight>
    );
  }

  render = () => {
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
