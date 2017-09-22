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
} from 'react-native';

import { PepperoniLogo, IconButton } from '../../components/Pepperoni';
import { Title, Description, Bold } from '../../components/Text';
import { ViewContainer, Centered, FlexRow } from '../../components/Layout';
import Person from '../../components/Person';
import TabProfile from '../../components/TabProfile';

const mapStateToProps = state => ({});

export class PeopleView extends React.Component {
  static navigationOptions = {
    title: 'People',
  };

  state = { data: {} };

  keyExtractor = item => item.id;

  renderItem = ({ item }) => <Person color="#939795" data={item} />;

  componentDidMount() {
    fetch('http://0.0.0.0:3888/users', {
      method: 'get',
      headers: {
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmb29AYmFyLmNvbSIsInNjb3BlIjoidXNlciIsImlhdCI6MTUwNDg2NDg0OH0.jk2cvlueBJTWuGB0VMjYnbUApoDua_8FrzogDXzz9iY',
      },
    })
      .then(response => response.json())
      .then(data => this.setState({ data }));
  }

  render = () => (
    <ViewContainer>
      <Title> People </Title>
      <Centered>
        <FlatList
          data={this.state.data}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          horizontal={true}
        />
      </Centered>
    </ViewContainer>
  );
}

export default connect(undefined)(PeopleView);
