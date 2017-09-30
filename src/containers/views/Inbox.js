import React from 'react';
import { connect } from 'react-redux';
import { View, FlatList } from 'react-native';
import { IconImage } from '../../components/Layout';
import InboxCard from '../../components/InboxCard';

export class InboxView extends React.Component {
  static navigationOptions = {
    title: 'Inbox',
    header: {
      visible: false,
    },
    tabBarIcon: ({ tintColor }) => (
      <IconImage
        source={require('../../../assets/inbox.png')}
        tintColor={tintColor}
      />
    ),
  };

  state = {
    messages: [
      { user: 'Peter', lastMessage: 'Lorem ipsum' },
      { user: 'John', lastMessage: 'Dolor sit amet' },
    ],
  };

  keyExtractor = item => item.user;
  renderItem = ({ item }) => {
    const { user, lastMessage } = item;
    return <InboxCard name={user} message={lastMessage} color={'orange'} />;
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.state.messages}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          style={{ flex: 1 }}
        />
      </View>
    );
  }
}

export default InboxView;
