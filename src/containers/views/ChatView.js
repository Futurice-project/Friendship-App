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

  state = {
    text: '',
  };

  keyExtractor = item => item.id;
  renderItem = ({ item }) => {
    return (
      <View>
        <Text
          style={{
            flex: 1,
            padding: 20,
            backgroundColor: '#d8d8d8',
            margin: 10,
            color: '#4a4a4a',
          }}
        >
          {item.text_message}
        </Text>
      </View>
    );
  };

  render() {
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
          data={this.props.navigation.state.params.chatroom.messages || []}
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
            <TouchableOpacity onPress={() => {}}>
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
  sendMessage: (id, text, user) => {
    dispatch(
      rest.actions.sendMessage(
        { id },
        {
          body: JSON.stringify({ text, user }),
        },
      ),
    );
  },
});

const mapStateToProps = state => ({
  chatRoomMessages: state.chatRoomMessages.data.messages,
  sentMessage: state.sendMessage,
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatView);
