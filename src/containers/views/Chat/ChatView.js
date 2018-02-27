import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import { NavigationActions } from 'react-navigation';
import ReversedFlatList from 'react-native-reversed-flat-list';
import styled from 'styled-components/native';
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import rest from '../../../utils/rest';
import Button from '../../../components/Button';
import PopUpMenu from '../../../components/PopUpMenu';

// console.ignoredYellowBox = ['Setting a timer'];

const mapDispatchToProps = dispatch => ({
  onViewProfile: profileId =>
    dispatch(
      NavigationActions.navigate({
        routeName: 'ProfileUser',
        params: { profileId },
      }),
    ),
  chatRoomMessages: id => {
    dispatch(rest.actions.chatRoomMessages({ id }));
  },
  //update all messages that have been read
  updateReadMessages: messageIdArr => {
    dispatch(
      rest.actions.updateReadMessages(
        {},
        { body: JSON.stringify({ messageIdArr: messageIdArr }) },
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
});

const mapStateToProps = state => ({
  auth: state.auth,
  currentUserId: state.auth.data.decoded ? state.auth.data.decoded.id : null,
  chatRoom: state.chatRoomMessages.data,
  sentMessage: state.sendMessage,
});

class ChatView extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.userEmoji} ${navigation.state.params
      .username}`,
    headerLeft: (
      <Icon
        style={{ padding: 15, fontSize: 26 }}
        name={'ios-arrow-back'}
        onPress={() => {
          navigation.dispatch(
            NavigationActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({
                  routeName: 'InboxView',
                }),
              ],
            }),
          );
        }}
      />
    ),
    headerRight: (
      <PopUpMenu isReportVisible={navigation.state.params.showReport} chat />
    ),
  });

  state = {
    chatroomId: '',
    text: '',
    description: '',
    isOptionsVisible: false,
    isReportVisible: false,
  };

  componentDidMount = () => {
    this.setState({
      chatroomId: this.props.navigation.state.params.chatroomId,
    });
    this.props.navigation.setParams({ showReport: this.showReport });
    this.props.chatRoomMessages(this.props.navigation.state.params.chatroomId);
    //update all unread messages after 3 seconds to make sure all the chatroom messages have been fetched
    setTimeout(() => this.getUnreadMessagesAndUpdateStatus(), 3000);
  };

  componentWillReceiveProps = () => {
    if (this.props.chatroom) {
      this.props.navigation.setParams({ chatroom: this.props.chatroom });
    }
  };

  getUnreadMessagesAndUpdateStatus = () => {
    //get an array of all the unread messages which have the 'read' field equals to 'false' and user_id not equals to current user id
    let messageArr = this.props.chatRoom.messages
      ? this.props.chatRoom.messages.filter(
          message =>
            message.read === false &&
            message.user_id !== this.props.currentUserId,
        )
      : [];
    console.log(messageArr);
    //get an array of all the id of unread messages
    let messageIdArr = messageArr.map(message => message.id);
    console.log(messageIdArr);
    //call the update function to change the 'read' field into 'true'
    this.props.updateReadMessages(messageIdArr);
  };

  sendMessage = () => {
    //Keyboard.dismiss();
    const chatroomId = this.props.navigation.state.params.chatroomId;
    const textMessage = this.state.text;
    const userId = this.props.currentUserId;

    this.props.sendMessage(chatroomId, textMessage, userId);
    this.setState({ text: '' });
  };

  // Modal functions
  showReport = () => {
    const { isReportVisible } = this.state;
    this.setState({ isReportVisible: !isReportVisible });
  };

  sendReport = () => {
    const creator = this.props.chatRoom.creator;
    const receiver = this.props.chatRoom.receiver;
    const userId =
      this.props.currentUserId === creator.id ? receiver.id : creator.id;
    const description = this.state.reportDescription;
    const reported_by = this.props.currentUserId;
    fetch(`http://localhost:3888/reports`, {
      method: 'post',
      headers: {
        Authorization: this.props.auth.data.token,
      },
      body: JSON.stringify({
        userId,
        description,
        reported_by,
      }),
    });
    this.setState({ isReportVisible: false });
  };

  keyExtractor = item => item.id;

  renderItem = ({ item }) => {
    const textAlign =
      item.user_id === this.props.currentUserId ? 'right' : 'left';
    const messageCardStyle =
      item.user_id === this.props.currentUserId
        ? styles.SendCard
        : styles.ReceiveCard;

    let time = '';
    const msgTime = new Date(item.chat_time);
    if (msgTime) {
      const msgDate = msgTime.getDate();
      const msgMonth = msgTime.getMonth();
      const msgYear = msgTime.getFullYear();
      const now = new Date();
      const diff =
        Math.abs(now.getTime() - msgTime.getTime()) / (1000 * 60 * 60 * 24);

      const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ];
      const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];
      const timeArr = msgTime
        .toTimeString()
        .split(' ')[0]
        .split(':');

      if (now.getFullYear() !== msgYear) {
        //not same year
        time =
          months[msgMonth] +
          ' ' +
          msgDate +
          ' ' +
          msgYear +
          ' - ' +
          timeArr[0] +
          ':' +
          timeArr[1];
      } else if (now.getFullYear() === msgYear && diff > 7) {
        //if not within a week
        time =
          months[msgMonth] +
          ' ' +
          msgDate +
          ' - ' +
          timeArr[0] +
          ':' +
          timeArr[1];
      } else if (now.getFullYear() === msgYear && diff <= 7) {
        //day of week
        time = days[msgTime.getDay()] + ' - ' + timeArr[0] + ':' + timeArr[1];
      } else if (
        now.getFullYear() === msgYear &&
        now.getMonth() === msgMonth &&
        now.getDate() === msgDate
      ) {
        //today
        time = timeArr[0] ? timeArr[0] + ':' + timeArr[1] : '';
      } else if (now.getTime() - msgTime.getTime() < 0) {
        time =
          months[msgMonth] +
          ' ' +
          msgDate +
          ' ' +
          msgYear +
          ' ' +
          msgTime.toTimeString().split(' ')[0];
      }
    }

    return (
      <View style={messageCardStyle}>
        <Text
          style={{
            textAlign,
            fontSize: 10,
            color: '#60686d',
            marginBottom: 10,
          }}
        >
          {time}
        </Text>
        <Text style={{ color: '#4a4a4a', textAlign }}>{item.text_message}</Text>
      </View>
    );
  };

  render() {
    let reportTitle = 'Report ';
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={Platform.select({
          ios: () => 65,
          android: () => 80,
        })()}
      >
        <ReversedFlatList
          data={this.props.chatRoom.messages || []}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          style={{ flex: 1, backgroundColor: 'white' }}
        />
        <TextInputCard>
          <TextInput
            style={{ flex: 5, paddingLeft: 20 }}
            returnKeyType="send"
            placeholder={'Message '}
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
            onSubmitEditing={() => this.sendMessage()}
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
        <Modal
          visible={this.state.isReportVisible}
          animationIn="slideInUp"
          animationInTiming={200}
        >
          <View
            style={{
              height: 200,
              backgroundColor: '#eee',
              borderRadius: 10,
              paddingVertical: 10,
            }}
          >
            <TextInput
              autoCorrect={false}
              autoCapitalize="none"
              titleColor="#2d4359"
              title={reportTitle}
              placeholder="Description"
              backColor="#faf6f0"
              onChangeText={reportDescription =>
                this.setState({ reportDescription })}
              value={this.state.reportDescription}
            />
            <View style={{ flexDirection: 'row' }}>
              <Button
                title="Cancel"
                primary
                textColor="green"
                size="half"
                color="light"
                onPress={this.showReport}
              />
              <Button
                title="Report"
                border
                textColor="black"
                size="half"
                color="dark"
                onPress={this.sendReport}
              />
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    );
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(ChatView);
