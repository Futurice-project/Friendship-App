import React, { Component } from 'react';
import {
  View,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  TextInputCard,
  ChatMessageCard,
  ChatInputButtonCard,
  ChatHeaderImage,
} from '../../components/Layout';
import MessageCard from '../../components/MessageCard';

class ChatView extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.name}`,
    headerRight: (
      <ChatHeaderImage source={require('../../../assets/following.png')} />
    ),
  });

  componentDidMount() {
    this.ScrollToBottom();
  }

  state = {
    text: '',
    currentUser: 'Thu',
    messages: [
      { user: 'Peter', text: 'Lorem ipsum' },
      { user: 'Thu', text: 'Dolor sit amet' },
      { user: 'Thu', text: 'Consectetur' },
      { user: 'Peter', text: 'adipiscing elit ir' },
      { user: 'Thu', text: 'morbi tristique' },
      { user: 'Peter', text: 'Pellentesque' },
      { user: 'Peter', text: 'convallis cursus' },
      { user: 'Thu', text: 'ullamcorper' },
      { user: 'Peter', text: 'Donec mattis' },
      { user: 'Thu', text: 'adipiscing elit' },
      { user: 'Peter', text: 'mattis nunc' },
      { user: 'Peter', text: 'convallis c3ursus' },
      { user: 'Thu', text: 'ulla5mcorper' },
      { user: 'Peter', text: 'Donec fmattis' },
      { user: 'Thu', text: 'adipisciwng elit' },
      { user: 'Peter', text: 'mattis fnunc' },
      { user: 'Thu', text: 'ulla5mcodrper' },
      { user: 'Peter', text: 'Donec fmaattis' },
      { user: 'Thu', text: 'adipisciwang elit' },
      { user: 'Peter', text: 'mattis fncunc' },
    ],
  };

  keyExtractor = item => item.text;
  renderItem = ({ item }) => {
    const { text, user } = item;
    return (
      <MessageCard message={text} isSent={user === this.state.currentUser} />
    );
  };

  getItemLayout = (data, index) => ({ length: 50, offset: 50 * index, index });

  ScrollToBottom = () => {
    const wait = new Promise(resolve => setTimeout(resolve, 100));
    wait.then(() => {
      this.flatListRef.scrollToIndex({
        animated: true,
        index: this.state.messages.length - 1,
      });
    });
  };

  onSend = () => {
    const { text, currentUser } = this.state;
    const newMessage = { user: currentUser, text };
    if (text !== '') {
      this.setState({
        messages: [...this.state.messages, newMessage],
        text: '',
      });
      this.ScrollToBottom();
    }
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
        <ChatMessageCard>
          <FlatList
            data={this.state.messages}
            ref={ref => {
              this.flatListRef = ref;
            }}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
            style={{ flex: 1 }}
            getItemLayout={this.getItemLayout}
          />
        </ChatMessageCard>
        <TextInputCard>
          <TextInput
            style={{ flex: 5, paddingLeft: 20 }}
            placeholder={'Your message '}
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
            onSubmitEditing={this.onSend}
          />
          <ChatInputButtonCard>
            <TouchableOpacity onPress={() => this.onSend()}>
              <Image
                source={require('../../../assets/following.png')}
                style={{ width: 30, height: 30 }}
              />
            </TouchableOpacity>
          </ChatInputButtonCard>
        </TextInputCard>
      </KeyboardAvoidingView>
    );
  }
}

export default ChatView;
