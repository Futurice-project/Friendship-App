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

  keyExtractor = item => item.id;
  renderItem = ({ item }) => <Person color="#939795" data={item} />;

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    //this.setState({ loading: true });
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
    this.setState(state => ({
      data: [...state.data, ...json],
      loading: false,
    }));
  };

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
          //ListFooterComponent= {() => <ActivityIndicator animating size= 'small'/>}
          horizontal
        />
      </Centered>
    </ViewContainer>
  );
}

export default connect(undefined)(PeopleView);
