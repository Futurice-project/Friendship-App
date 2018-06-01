import React from 'react';
import { connect } from 'react-redux';
import {
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  KeyboardAvoidingView,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import {
  HideWithKeyboard,
  ShowWithKeyboard,
} from 'react-native-hide-with-keyboard';

import rest from '../../../utils/rest';
import RoundTab from '../../../components/RoundTab';

import waveShape from '../../../../assets/img/curve/curve.png';

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
  state = { text: '', scrollable: false };

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._updateScrollable,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._updateScrollable,
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  createChatroom = () => {
    const userCreatorId = this.props.currentUserId;
    const userReceiverId = this.props.navigation.state.params.user.id;
    this.props.createChatRoom(userCreatorId, userReceiverId, this.openChatView);
  };

  openChatView = chatroomId => {
    Keyboard.dismiss();
    const { username, avatar } = this.props.navigation.state.params.user;

    this.props.openChatView(
      chatroomId,
      username,
      avatar,
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

  _updateScrollable = () => {
    this.setState(prevState => ({ scrollable: !prevState.scrollable }));
  };

  _onLayoutChange = () => {
    this.refs.scroll.scrollToEnd();
  };

  render() {
    const { username } = this.props.navigation.state.params.user;
    return (
      <KeyboardAvoidingView
        style={{
          backgroundColor: '#e8e9e8',
          display: 'flex',
          flexDirection: 'column',
          paddingTop: 30,
          height: '100%',
          width: '100%',
        }}
        enabled={true}
        keyboardVerticalOffset={0}
        behavior={'padding'}
      >
        <View style={{ flex: 1 }}>
          <Text
            style={styles.cancelButton}
            onPress={() => this.props.navigation.goBack()}
          >
            CANCEL
          </Text>
          <Image
            source={waveShape}
            resizeMode="stretch"
            style={{ width: '100%', tintColor: '#fff' }}
          />
          <ScrollView
            ref="scroll"
            style={{
              width: '100%',
              backgroundColor: '#fff',
              paddingHorizontal: 20,
              paddingTop: 20,
            }}
            scrollEnabled={this.state.scrollable}
            onContentSizeChange={this._onLayoutChange}
          >
            <Text
              style={styles.inviteText}
            >{`Tell ${username} what you would like to talk about:`}</Text>
            <TextInput
              style={{
                borderRadius: 30,
                backgroundColor: '#e8e9e8',
                width: '100%',
                minHeight: 150,
                maxHeight: 250,
                marginTop: 20,
                padding: 20,
                paddingTop: 20,
                textAlignVertical: 'top',
              }}
              autoFocus={true}
              placeholder={'Write your message here'}
              multiline={true}
              onChangeText={text => this.setState({ text })}
              underlineColorAndroid="transparent"
            />
            <TouchableOpacity
              style={{
                ...styles.sendButton,
                backgroundColor:
                  this.state.text.trim().length > 0 ? '#3b3b3d' : 'grey',
              }}
              onPress={() => this.createChatroom()}
              disabled={!this.state.text.trim().length > 0}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: '#faf5f0',
                  fontFamily: 'NunitoSans-Bold',
                }}
              >
                Send
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = {
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    textDecorationLine: 'underline',
    fontSize: 13,
    color: '#3b3b3b',
    fontFamily: 'NunitoSans-Bold',
    paddingLeft: 18,
    paddingBottom: 20,
  },
  sendButtonHeader: {
    ...Platform.select({
      ios: {
        display: 'none',
      },
      android: {
        textDecorationLine: 'underline',
        fontSize: 13,
        color: '#3b3b3b',
        fontFamily: 'NunitoSans-Bold',
        margin: 18,
      },
    }),
  },
  inviteText: {
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontSize: 25,
    fontFamily: 'NunitoSans-Regular',
    color: '#60686d',
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
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '70%',
    height: 50,
    marginTop: 20,
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatRequest);
