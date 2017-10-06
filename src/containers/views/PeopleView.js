import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { SearchBar } from 'react-native-elements';

import { Title } from '../../components/Text';
import {
  ViewContainer,
  Centered,
  FullscreenCentered,
  IconImage,
  SmallHeader,
} from '../../components/Layout';
import Person from '../../components/Person';
import Tag from '../../components/Tags';
import Spinner from '../../components/Spinner';

const mapDispatchToProps = dispatch => ({
  openSearchTag: () =>
    dispatch(
      NavigationActions.navigate({
        routeName: 'SearchList',
      }),
    ),
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
    tags: [],
    page: 0,
    loading: false,
    filteredUsers: [],
    searchedUsername: '',
    infiniteScrollStop: false,
  };

  keyExtractor = item => item.id;
  renderItem = ({ item }) => <Person box data={item} />;

  tagKeyExtractor = item => item.id;
  tagRenderItem = ({ item }) => <Tag data={item} />;

  componentDidMount() {
    this.fetchData();
    this.fetchTags();
  }

  fetchData = async () => {
    this.setState({ loading: true });
    const response = await fetch(
      `http://0.0.0.0:3888/users/page/${this.state.page}`,
      {
        method: 'get',
        headers: {
          Authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmb29AYmFyLmNvbSIsInNjb3BlIjoidXNlciIsImlhdCI6MTUwNDg2NDg0OH0.jk2cvlueBJTWuGB0VMjYnbUApoDua_8FrzogDXzz9iY',
        },
      },
    );
    const json = await response.json();

    // Stop requesting for the new page
    // when there is nothing more! Expected to be handle when request fail
    if (json.length === 0) this.setState({ infiniteScrollStop: true });

    this.setState(state => ({
      data: [...state.data, ...json],
      loading: false,
    }));
  };

  handleEnd = () => {
    if (!this.state.infiniteScrollStop) {
      this.setState(
        state => ({ page: this.state.page + 1 }),
        () =>
          this.fetchData().catch(e =>
            console.error(e + ' handleEnd in PeopleView.js'),
          ),
      );
    }
  };

  getUserByUsername(username) {
    this.setState({
      searchedUsername: username,
      infiniteScrollStop: username ? true : false,
    });

    fetch(`http://0.0.0.0:3888/users/search/${username}`, {
      method: 'get',
      headers: {
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmb29AYmFyLmNvbSIsInNjb3BlIjoidXNlciIsImlhdCI6MTUwNDg2NDg0OH0.jk2cvlueBJTWuGB0VMjYnbUApoDua_8FrzogDXzz9iY',
      },
    })
      .then(response => response.json())
      .then(filteredUsers => this.setState({ filteredUsers }))
      .catch(err => {
        console.log('error search user');
        console.error(err);
      });
  }

  renderSpinner() {
    if (this.state.loading) {
      return <Spinner fullflex={this.state.data.length === 0} />;
    }
  }

  fetchTags = async () => {
    // this.setState({ loading: true });

    fetch(`http://0.0.0.0:3888/tags`, {
      method: 'get',
      headers: {
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmb29AYmFyLmNvbSIsInNjb3BlIjoidXNlciIsImlhdCI6MTUwNDg2NDg0OH0.jk2cvlueBJTWuGB0VMjYnbUApoDua_8FrzogDXzz9iY',
      },
    })
      .then(response => response.json())
      .then(tags => this.setState({ tags }))
      .catch(err => {
        console.log('errorTags');
        console.error(err + ' error fetchTags in PeopleView.js');
      });
    // renderSpinner() {
    //   if (this.state.loading) {
    //     return <Spinner fullflex={this.state.data.length === 0} />;
    //   }
  };

  render = () => (
    <ViewContainer style={{ backgroundColor: '#fff' }}>
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
      <SmallHeader> People </SmallHeader>

      <FullscreenCentered>
        <FlatList
          data={
            this.state.searchedUsername.length > 0 ? (
              this.state.filteredUsers
            ) : (
              this.state.data
            )
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

      <Title> Tags </Title>
      <SmallHeader> Activities</SmallHeader>
      <FullscreenCentered>
        <View style={styles.tagList}>
          {this.state.tags.map(tag => <Tag key={tag.id} data={tag} />)}
        </View>
      </FullscreenCentered>
    </ViewContainer>
  );
}

const styles = StyleSheet.create({
  tagList: {
    margin: 22,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
});
export default connect(undefined, mapDispatchToProps)(PeopleView);
