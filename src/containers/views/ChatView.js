import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import SocketIOClient from 'socket.io-client';
import ReversedFlatList from 'react-native-reversed-flat-list';
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
import {
  TextInputCard,
  ChatMessageCard,
  ChatInputButtonCard,
  ProfileImage,
  CircleView,
} from '../../components/Layout';
import MessageCard from '../../components/MessageCard';
import PopUpMenu from '../../components/PopUpMenu';
import rest from '../../utils/rest';

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

console.ignoredYellowBox = ['Setting a timer'];

class ChatView extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.name}`,
    headerRight: (
      <TouchableOpacity onPress={navigation.state.params.onMenuPopup}>
        <CircleView width={40} height={40}>
          {navigation.state.params.avatar ? (
            <ProfileImage
              source={{ uri: navigation.state.params.avatar }}
              width={40}
              height={40}
            />
          ) : (
            <ProfileImage
              source={require('../../../assets/profile.png')}
              width={25}
              height={25}
              tintColor={'#999'}
            />
          )}
        </CircleView>
      </TouchableOpacity>
    ),
  });

  state = {
    popUpMenu: false,
    text: '',
    currentUser: 'thunghiem',
    data: {},
    messages: [],
  };

  socket = SocketIOClient('https://chat-app-thunghiem.herokuapp.com');

  componentDidMount() {
    this.props.navigation.setParams({ onMenuPopup: this.onMenuPopup });
    //this.props.getChatRoomMessage(this.props.navigation.state.params.roomID);
    //setInterval(() => this.fetchData(), 100);
    this.socket.emit('room.join', this.props.navigation.state.params.roomID);
    this.socket.on('message', this.onMessage);
    this.fetchData();
  }

  onMessage = message => {
    this.setState({ messages: [...this.state.messages, message] });
  };

  fetchData = async () => {
    try {
      const response = await fetch(
        `https://chat-app-thunghiem.herokuapp.com/chatrooms/searchById/${this
          .props.navigation.state.params.roomID}`,
      );
      const data = await response.json();
      this.setState({ data, messages: data.messages });
      this.addBreakToMessage();
    } catch (error) {
      console.error(error);
    }
  };

  sendData = async () => {
    this.socket.emit('message', {
      user: this.state.currentUser,
      room: this.props.navigation.state.params.roomID,
      text: this.state.text,
    });
    // try {
    //   fetch(`https://chat-app-thunghiem.herokuapp.com/chatrooms/${this.props.navigation.state.params.roomID}`, {
    //     method: 'POST',
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       text: this.state.text,
    //       user: this.state.currentUser,
    //     })
    //   }).then(() => this.fetchData());
    // } catch(error) {
    //   console.error(error);
    // }
  };

  onMenuPopup = () => {
    const { popUpMenu } = this.state;
    this.setState({ popUpMenu: !popUpMenu });
    LayoutAnimation.spring();
  };

  onSend = () => {
    const { text, currentUser } = this.state;
    //const newMessage = { user: currentUser, text };
    //Keyboard.dismiss();
    if (text !== '') {
      this.setState({
        // messages: [...this.state.messages, newMessage],
        text: '',
      });
      // this.props.sendMessage(
      //   this.props.navigation.state.params.roomID,
      //   text,
      //   currentUser,
      // );
      this.sendData();
      //this.fetchData();
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

  addBreakToMessage = () => {
    const temp = [];
    let lastDate = null;

    this.state.messages.forEach(m => {
      let message = m;
      const messageDate = new Date(m.date);
      const timeDiff = lastDate
        ? messageDate.getTime() - lastDate.getTime()
        : null;
      const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      if (diffDays > 1 || !lastDate) {
        message.dateBreak = m.date;
        lastDate = messageDate;
      }
      temp.push(message);
    });

    this.setState({ messages: temp });
  };

  keyExtractor = item => item._id;
  renderItem = ({ item }) => {
    const { text, author, date, dateBreak } = item;
    return (
      <View>
        <Text style={{ textAlign: 'center', color: '#b8b9bb', paddingTop: 10 }}>
          {dateBreak ? dateBreak.slice(0, 10) : null}
        </Text>
        <MessageCard
          message={text}
          isSent={author === this.state.currentUser}
          date={date}
        />
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
        <ChatMessageCard>
          <PopUpMenu
            popup={this.state.popUpMenu}
            onViewProfile={this.onViewProfile}
            onDelete={this.onDelete}
            onBlock={this.onBlock}
          />
          <ReversedFlatList
            data={this.state.messages}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
            style={{ flex: 1 }}
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
              <Text
                style={{
                  fontWeight: 'normal',
                  fontSize: 16,
                  color: '#6cc5c9',
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
