import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
  Keyboard,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { IconImage } from '../../components/Layout';

import rest from '../../utils/rest';
import RoundTab from '../../components/RoundTab';
import InboxCard from '../../components/InboxCard';
import SuggestionList from '../../components/SuggestionList';

const styles = {
  cancelButton: {
    textDecorationLine: 'underline',
    fontSize: 13,
    color: '#3b3b3b',
    fontWeight: 'bold',
    margin: 18,
  },
  inviteText: {
    position: 'absolute',
    top: 60,
    textAlign: 'center',
    fontSize: 30,
    color: '#60686d',
    padding: 40,
    zIndex: 2,
  },
  sendButton: {
    width: 250,
    height: 55,
    borderRadius: 50,
    backgroundColor: '#3b3b3d',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
};

export class ChatRequest extends React.Component {
  state = { text: '' };

  componentDidMount() {}

  createChatroom = () => {
    const userCreatorId = this.props.currentUserId;
    const userReceiverId = this.props.navigation.state.params.user.id;

    this.props.createChatRoom(userCreatorId, userReceiverId, this.sendMessage);
  };

  sendMessage = chatroomId => {
    Keyboard.dismiss();

    this.props.sendMessage(
      chatroomId,
      this.state.text,
      this.props.currentUserId,
      this.openChatView,
    );
  };

  openChatView = chatroomId => {
    const { username, emoji } = this.props.navigation.state.params.user;
    this.props.openChatView(chatroomId, username, emoji);
  };

  render() {
    return (
      <View style={{ flex: 1, marginTop: 20 }}>
        <Text
          onPress={() => this.props.navigation.goBack()}
          style={styles.cancelButton}
        >
          CANCEL
        </Text>
        <RoundTab tint="#fff" />
        <Text style={styles.inviteText}>{`Tell ${this.props.navigation.state
          .params.user.username} what you would like to talk about:`}</Text>
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          <TextInput
            style={{
              borderBottomColor: 'gray',
              borderBottomWidth: 2,
              margin: 50,
              marginTop: 120,
              marginBottom: 30,
              flex: 1,
              maxHeight: 40,
              zIndex: 10,
            }}
            placeholder={'Message'}
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
            onSubmitEditing={() => {}}
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={() => this.createChatroom()}
          >
            <Text
              style={{ fontSize: 20, color: '#faf5f0', fontWeight: 'bold' }}
            >
              send
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  currentUserId: state.auth.data.decoded ? state.auth.data.decoded.id : null,
  chatroom: state.createChatRoom,
});

const mapDispatchToProps = dispatch => ({
  createChatRoom: (userCreatorId, userReceiverId, callback) => {
    dispatch(
      rest.actions.createChatRoom(
        {},
        {
          body: JSON.stringify({ userCreatorId, userReceiverId }),
        },
        (err, data) => callback(data.id),
      ),
    );
  },
  sendMessage: (id, textMessage, userId, callback) => {
    dispatch(
      rest.actions.sendMessage(
        { id },
        {
          body: JSON.stringify({ textMessage, userId }),
        },
        (err, data) => callback(id),
      ),
    );
  },
  openChatView: (chatroomId, username, userEmoji) =>
    dispatch(
      NavigationActions.navigate({
        routeName: 'ChatView',
        params: { chatroomId, username, userEmoji },
      }),
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatRequest);
