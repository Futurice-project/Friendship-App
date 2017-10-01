import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
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
} from 'react-native';
import {
  TextInputCard,
  ChatMessageCard,
  ChatInputButtonCard,
  ChatHeaderImage,
} from '../../components/Layout';
import MessageCard from '../../components/MessageCard';
import PopUpMenu from '../../components/PopUpMenu';
import rest from '../../utils/rest';

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

class ChatView extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.name}`,
    headerRight: (
      <TouchableOpacity onPress={navigation.state.params.onMenuPopup}>
        <ChatHeaderImage source={require('../../../assets/following.png')} />
      </TouchableOpacity>
    ),
  });

  componentDidMount() {
    this.props.navigation.setParams({ onMenuPopup: this.onMenuPopup });
    //this.props.getChatRoomMessage(this.props.navigation.state.params.roomID);
    this.fetchData();
  }

  state = {
    popUpMenu: false,
    text: '',
    currentUser: 'thunghiem',
    data: {},
  };

  fetchData = async () => {
    const response = await fetch(
      `https://chat-app-thunghiem.herokuapp.com/chatrooms/searchById/${this
        .props.navigation.state.params.roomID}`,
      {
        method: 'get',
      },
    );
    const data = await response.json();
    this.scrollToBottom();
    this.setState({ data });
  };

  onMenuPopup = () => {
    const { popUpMenu } = this.state;
    this.setState({ popUpMenu: !popUpMenu });
    LayoutAnimation.spring();
  };

  onSend = () => {
    const { text, currentUser } = this.state;
    const newMessage = { user: currentUser, text };
    Keyboard.dismiss();
    if (text !== '') {
      this.setState({
        // messages: [...this.state.messages, newMessage],
        text: '',
      });
      this.props.sendMessage(
        this.props.navigation.state.params.roomID,
        text,
        currentUser,
      );
      this.fetchData();
      this.scrollToBottom();
    }
  };

  onViewProfile = () => {
    this.props.onViewProfile();
  };

  onDelete = () => {
    this.props.navigation.navigate('Inbox');
  };

  onBlock = () => {
    this.props.navigation.navigate('Inbox');
  };

  keyExtractor = item => item._id;
  renderItem = ({ item }) => {
    const { text, author } = item;
    return (
      <MessageCard message={text} isSent={author === this.state.currentUser} />
    );
  };

  getItemLayout = (data, index) => ({ length: 50, offset: 50 * index, index });

  scrollToBottom = () => {
    const wait = new Promise(resolve => setTimeout(resolve, 200));
    wait.then(() => {
      this.flatListRef.scrollToIndex({
        animated: true,
        index: this.state.data.messages.length - 1,
      });
    });
  };

  render() {
    //console.log(this.props.chatRoomMessages);
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
          <PopUpMenu
            popup={this.state.popUpMenu}
            onViewProfile={this.onViewProfile}
            onDelete={this.onDelete}
            onBlock={this.onBlock}
          />
          <FlatList
            data={this.state.data.messages}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatView);
