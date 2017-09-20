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
import { List, ListItem } from 'react-native-elements';

import { PepperoniLogo, IconButton } from '../../components/Pepperoni';
import { Title, Description, Bold } from '../../components/Text';
import { ViewContainer, Centered, FlexRow } from '../../components/Layout';
import Person from '../../components/Person';

const mapStateToProps = state => ({});

export class PeopleView extends React.Component {
  static navigationOptions = {
    title: 'People',
  };

  state = {
    data: {},
    page: 0,
    loading: false,
  };

  // keyExtractor = item => item.id;
  keyExtractor = (x, i) => i;
  // what does (x , i) => i mean. If I didn't change this, it'd say the id for every list item is the same. So this somehow changes the id for each item

  renderItem = ({ item }) => (
    <ListItem
      roundAvatar
      avatar={{ uri: item.picture.thumbnail }}
      title={`${item.name.first} ${item.name.last}`}
    />
  );
  // <Person color="#939795" data={item} />

  componentDidMount() {
    this.fetchData();
  }

  // fetchData = async () => {
  //  // this.setState({ loading: true });
  //   const response = await fetch (
  //     `http://0.0.0.0:3888/users/page/${this.state.page}`, {
  //         method: 'get',
  //         headers: {
  //           Authorization:        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmb29AYmFyLmNvbSIsInNjb3BlIjoidXNlciIsImlhdCI6MTUwNDg2NDg0OH0.jk2cvlueBJTWuGB0VMjYnbUApoDua_8FrzogDXzz9iY',
  //         }, });
  //   const json = await response.json();
  //   this.setState(state => ({ data: [...state.data, ...json.results], loading: false}));
  // };
  // // // // // // // // //
  fetchData = async () => {
    // this.setState({ loading: true });
    const response = await fetch(
      `https://randomuser.me/api?results=15&seed=hi&page=${this.state.page}`,
    );
    const json = await response.json();
    this.setState(state => ({
      data: [...state.data, ...json.results],
      loading: false,
    }));
  };

  // componentDidMount() {
  //   fetch('http://0.0.0.0:3888/users/page/4', {
  //     method: 'get',
  //     headers: {
  //       Authorization:
  //         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmb29AYmFyLmNvbSIsInNjb3BlIjoidXNlciIsImlhdCI6MTUwNDg2NDg0OH0.jk2cvlueBJTWuGB0VMjYnbUApoDua_8FrzogDXzz9iY',
  //     },
  //   })
  //     .then(response => response.json())
  //     .then(data => this.setState({ data }));
  // }

  handleEnd = () => {
    this.setState(
      state => ({ page: this.state.page + 1 }),
      () => this.fetchData(),
    );
  };

  render = () => (
    <ViewContainer>
      <Title> People </Title>
      <Centered>
        <FlatList
          data={this.state.data}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          onEndReached={this.handleEnd}
          onEndReachedThreshold={0}
          // ListFooterComponent= {() => <ActivityIndicator animating size= 'small'/>}
          horizontal
        />
      </Centered>
    </ViewContainer>
  );
}

export default connect(undefined)(PeopleView);
