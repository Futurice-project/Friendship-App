import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import ReversedFlatList from 'react-native-reversed-flat-list';
import styled from 'styled-components/native';
import {
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  LayoutAnimation,
  NativeModules,
  Keyboard,
  Text,
  View,
} from 'react-native';

import PopUpMenu from '../../components/PopUpMenu';
import rest from '../../utils/rest';

const { UIManager } = NativeModules;

console.ignoredYellowBox = ['Setting a timer'];

const ChatInputButtonCard = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const TextInputCard = styled.View`
  height: 44px;
  background-color: #e8e9e8;
  flex-direction: row;
`;

class ChatView extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.chatroom.creator.emoji} ${navigation.state
      .params.chatroom.creator.username}`,
  });

  componentDidMount = () => {
    this.props.getChatRoomMessage(
      this.props.navigation.state.params.chatroom.chatroomid,
    );
  };

  state = {
    text: '',
  };

  sendMessage = () => {
    const chatroomId = this.props.navigation.state.params.chatroom.chatroomid;
    const textMessage = this.state.text;
    const userId = this.props.currentUserId;

    this.props.sendMessage(chatroomId, textMessage, userId);
    this.setState({ text: '' });
  };

  keyExtractor = item => item.id;
  renderItem = ({ item }) => {
    const textAlign =
      item.user_id == this.props.currentUserId ? 'right' : 'left';
    const messageCardStyle =
      item.user_id == this.props.currentUserId
        ? styles.SendCard
        : styles.ReceiveCard;
    return (
      <View style={messageCardStyle}>
        <Text
          style={{
            color: '#4a4a4a',
            textAlign: textAlign,
            fontSize: 10,
            color: '#60686d',
            marginBottom: 10,
          }}
        >
          Time
        </Text>
        <Text style={{ color: '#4a4a4a', textAlign: textAlign }}>
          {item.text_message}
        </Text>
      </View>
    );
  };

  render() {
    console.log(this.props.chatRoomMessages);
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={Platform.select({
          ios: () => 0,
          android: () => 80,
        })()}
      >
        <ReversedFlatList
          data={this.props.chatRoomMessages || []}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          style={{ flex: 1, backgroundColor: 'white' }}
        />
        <TextInputCard>
          <TextInput
            style={{ flex: 5, paddingLeft: 20 }}
            placeholder={'Message '}
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
            onSubmitEditing={() => {}}
          />
          <ChatInputButtonCard>
            <TouchableOpacity onPress={() => this.sendMessage()}>
              <Text
                style={{
                  fontWeight: 'normal',
                  fontSize: 16,
                  color: '#ff8a65',
                  paddingRight: 15,
                }}
              >
                Send
              </Text>
            </TouchableOpacity>
          </ChatInputButtonCard>
        </TextInputCard>
      </KeyboardAvoidingView>
    );
  }
}

const styles = {
  SendCard: {
    flex: 1,
    padding: 20,
    paddingBottom: 30,
    backgroundColor: '#f1f1f3',
    margin: 10,
    marginRight: 20,
    marginLeft: 40,
  },
  ReceiveCard: {
    flex: 1,
    padding: 20,
    paddingBottom: 30,
    backgroundColor: '#d8d8d8',
    margin: 10,
    marginRight: 40,
    marginLeft: 20,
  },
};

const mapDispatchToProps = dispatch => ({
  onViewProfile: profileId =>
    dispatch(
      NavigationActions.navigate({
        routeName: 'ProfileUser',
        params: { profileId },
      }),
    ),
  getChatRoomMessage: id => {
    dispatch(rest.actions.chatRoomMessages({ id }));
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
});

const mapStateToProps = state => ({
  currentUserId: state.auth.data.decoded ? state.auth.data.decoded.id : null,
  chatRoomMessages: state.chatRoomMessages.data.messages,
  sentMessage: state.sendMessage,
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatView);
