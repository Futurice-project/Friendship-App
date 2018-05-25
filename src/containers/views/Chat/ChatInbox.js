import React from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

import rest from '../../../utils/rest';
import RoundTab from '../../../components/RoundTab';
import InboxCard from '../../../components/InboxCard';
import SuggestionList from '../../../components/SuggestionList';
import Report from '../Report/Report';
import { NavigationActions } from 'react-navigation';

const mapStateToProps = state => ({
  currentUserId: state.auth.data.decoded ? state.auth.data.decoded.id : null,
  chatrooms: state.chatRoomsWithUserId.data,
  chatroomRefreshState: state.chatRoomsWithUserId,
});

const mapDispatchToProps = dispatch => ({
  chatRoomsWithUserId: id => {
    dispatch(rest.actions.chatRoomsWithUserId({ id }));
  },
  goToPeopleView: () =>
    dispatch(NavigationActions.navigate({ routeName: 'People' })),
});

export class ChatInbox extends React.Component {
  state = { showReport: false };

  componentDidMount() {
    this.timer = setInterval(
      async () =>
        await this.props.chatRoomsWithUserId(this.props.currentUserId),
      3000,
    );
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  keyExtractor = (item, index) => 'list-item-' + index;

  renderItem = ({ item }) => {
    return <InboxCard data={item} />;
  };

  render() {
    if (this.state.showReport) {
      return <Report />;
    }
    const sortedChatrooms = this.props.chatrooms
      ? this.props.chatrooms.sort(function(a, b) {
          const aLastMessageTime = a.messages[a.messages.length - 1].chat_time;
          const bLastMessageTime = b.messages[b.messages.length - 1].chat_time;
          return new Date(bLastMessageTime) - new Date(aLastMessageTime);
        })
      : [];
    return (
      <View style={{ flex: 1, paddingTop: 20 }}>
        <RoundTab tint="#ffffff" title="CHATS" fontSize="12" />
        {sortedChatrooms.length > 0 ? (
          <FlatList
            data={sortedChatrooms}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
            style={{ flex: 1, backgroundColor: 'white', minHeight: 300 }}
          />
        ) : (
          <View style={{ flex: 1, backgroundColor: '#fff', padding: 20 }}>
            <Text style={{ fontWeight: 'bold', paddingBottom: 20 }}>
              Get busy chatting!
            </Text>
            <Text style={{ paddingBottom: 20 }}>
              You have no active chats yet. To start a new chat, first find a
              person that seems interesting to you. Open their profile, see what
              you have in common and take it from there.
            </Text>
            <Text
              style={{ textDecorationLine: 'underline', color: '#ff8a65' }}
              onPress={() => this.props.goToPeopleView()}
            >
              Browse profiles
            </Text>
          </View>
        )}
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatInbox);
