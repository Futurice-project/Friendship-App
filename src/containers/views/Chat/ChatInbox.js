import React from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

import rest from '../../../utils/rest';
import RoundTab from '../../../components/RoundTab';
import InboxCard from '../../../components/InboxCard';
import SuggestionList from '../../../components/SuggestionList';
import Report from '../Report/Report';

const mapStateToProps = state => ({
  currentUserId: state.auth.data.decoded ? state.auth.data.decoded.id : null,
  chatrooms: state.chatRoomsWithUserId.data.data,
  chatroomRefreshState: state.chatRoomsWithUserId,
});

const mapDispatchToProps = dispatch => ({
  chatRoomsWithUserId: id => {
    dispatch(rest.actions.chatRoomsWithUserId({ id }));
  },
});

export class ChatInbox extends React.Component {
  state = { showReport: false };

  componentDidMount() {
    /*this.timer = setInterval(
      async () =>
        await this.props.chatRoomsWithUserId(this.props.currentUserId),
      3000,
    );*/
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  keyExtractor = (item, index) => index;

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
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 12,
            textAlign: 'center',
            color: '#60686d',
            marginTop: 30,
            fontWeight: 'bold',
          }}
        >
          SUGGESTIONS
        </Text>
        <SuggestionList existingChatRooms={this.props.chatrooms} />
        <View style={{ flex: 10 }}>
          <RoundTab tint="#ffffff" title="CHATS" fontSize="12" />
          <FlatList
            data={sortedChatrooms}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
            style={{ flex: 1, backgroundColor: 'white', minHeight: 300 }}
          />
        </View>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatInbox);
