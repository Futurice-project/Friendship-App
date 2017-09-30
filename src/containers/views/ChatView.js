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
} from 'react-native';
import {
  TextInputCard,
  ChatMessageCard,
  ChatInputButtonCard,
  ChatHeaderImage,
} from '../../components/Layout';
import MessageCard from '../../components/MessageCard';
import PopUpMenu from '../../components/PopUpMenu';

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
    this.scrollToBottom();
    this.props.navigation.setParams({ onMenuPopup: this.onMenuPopup });
  }

  state = {
    popUpMenu: false,
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

  onMenuPopup = () => {
    const { popUpMenu } = this.state;
    this.setState({ popUpMenu: !popUpMenu });
    LayoutAnimation.spring();
  };

  onSend = () => {
    const { text, currentUser } = this.state;
    const newMessage = { user: currentUser, text };
    if (text !== '') {
      this.setState({
        messages: [...this.state.messages, newMessage],
        text: '',
      });
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

  keyExtractor = item => item.text;
  renderItem = ({ item }) => {
    const { text, user } = item;
    return (
      <MessageCard message={text} isSent={user === this.state.currentUser} />
    );
  };

  getItemLayout = (data, index) => ({ length: 50, offset: 50 * index, index });

  scrollToBottom = () => {
    const wait = new Promise(resolve => setTimeout(resolve, 100));
    wait.then(() => {
      this.flatListRef.scrollToIndex({
        animated: true,
        index: this.state.messages.length - 1,
      });
    });
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

const mapDispatchToProps = dispatch => ({
  onViewProfile: profileId =>
    dispatch(
      NavigationActions.navigate({
        routeName: 'ProfileUser',
        params: { profileId },
      }),
    ),
});

export default connect(null, mapDispatchToProps)(ChatView);
