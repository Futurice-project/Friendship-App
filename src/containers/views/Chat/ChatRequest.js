import React from 'react';
import { connect } from 'react-redux';
import {
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { NavigationActions } from 'react-navigation';

import rest from '../../../utils/rest';
import RoundTab from '../../../components/RoundTab';

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
  sendMessage: (id, textMessage, userId) => {
    dispatch(
      rest.actions.sendMessage(
        { id },
        {
          body: JSON.stringify({ textMessage, userId }),
        },
      ),
    );
  },
  openChatView: (chatroomId, username, userEmoji, id, previousRoute) =>
    dispatch(
      NavigationActions.navigate({
        routeName: 'ChatView',
        params: { chatroomId, username, userEmoji, id, previousRoute },
      }),
    ),
});

export class ChatRequest extends React.Component {
  state = { text: '' };

  createChatroom = () => {
    const userCreatorId = this.props.currentUserId;
    const userReceiverId = this.props.navigation.state.params.user.id;
    this.props.createChatRoom(userCreatorId, userReceiverId, this.openChatView);
  };

  openChatView = chatroomId => {
    Keyboard.dismiss();
    const { username, emoji } = this.props.navigation.state.params.user;

    this.props.openChatView(
      chatroomId,
      username,
      emoji,
      this.props.navigation.state.params.user.id,
      this.props.navigation.state.params.route,
    );
    this.props.sendMessage(
      chatroomId,
      this.state.text,
      this.props.currentUserId,
      this.openChatView,
    );
  };

  render() {
    const { username } = this.props.navigation.state.params.user;
    return (
      <View style={{ flex: 1, marginTop: 20 }}>
        <Text
          onPress={() => this.props.navigation.goBack()}
          style={styles.cancelButton}
        >
          CANCEL
        </Text>
        <RoundTab tint="#fff" />
        <Text style={styles.inviteText}>
          {`Tell ${username} what you would like to talk about:`}
        </Text>
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          <TextInput
            style={styles.messageInput}
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

const styles = {
  cancelButton: {
    textDecorationLine: 'underline',
    fontSize: 13,
    color: '#3b3b3b',
    fontWeight: 'bold',
    margin: 18,
  },
  inviteText: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 60,
    textAlign: 'center',
    fontSize: 30,
    color: '#60686d',
    padding: 40,
    zIndex: 2,
  },
  messageInput: {
    borderBottomColor: 'gray',
    borderBottomWidth: 2,
    margin: 50,
    marginTop: 120,
    marginBottom: 30,
    flex: 1,
    maxHeight: 40,
    zIndex: 10,
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

export default connect(mapStateToProps, mapDispatchToProps)(ChatRequest);
