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
    isReportStatusVisible: false,
    reportStatusText: '',
  };

  componentDidMount = () => {
    this.setState({
      chatroomId: this.props.navigation.state.params.chatroomId,
    });
    this.props.navigation.setParams({ showReport: this.showReport });
    this.props.chatRoomMessages(this.props.navigation.state.params.chatroomId);
  };

  componentWillReceiveProps = () => {
    if (this.props.chatroom) {
      this.props.navigation.setParams({ chatroom: this.props.chatroom });
    }
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
    const { isReportVisible, reportDescription } = this.state;
    this.setState({ isReportVisible: !isReportVisible, reportDescription: '' });
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
    })
      .then(() =>
        this.setState({
          isReportStatusVisible: true,
          reportStatusText: 'User reported',
        }),
      )
      .catch(() =>
        this.setState({
          isReportStatusVisible: true,
          reportStatusText: 'Report failed',
        }),
      );
    this.setState({ isReportVisible: false });
  };

  keyExtractor = (item, index) => index;

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
    console.log(this.state.reportStatusText);
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
          style={[
            { flex: 1 },
            this.state.isReportVisible || this.state.isReportStatusVisible
              ? { backgroundColor: 'rgba(0,0,0,0.5)' }
              : { backgroundColor: 'white' },
          ]}
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
          transparent
          animationType="slide"
        >
          <View
            style={{
              height: 350,
              borderRadius: 5,
              backgroundColor: '#F1F1F3',
              padding: 20,
              paddingLeft: 10,
            }}
          >
            <View
              style={{
                marginLeft: 10,
                borderBottomWidth: 0.8,
                borderBottomColor: 'gray',
                marginBottom: 20,
                paddingBottom: 20,
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 20,
                  fontWeight: 'bold',
                  paddingBottom: 15,
                  borderBottomColor: 'gray',
                  borderBottomWidth: 0.8,
                }}
              >
                Send Report
              </Text>
              <Text style={{ marginTop: 10, fontSize: 16, color: '#60686d' }}>
                Report Title
              </Text>
              <TextInput style={styles.reportInput} />
              <Text style={{ marginTop: 10, fontSize: 16, color: '#60686d' }}>
                Report Description
              </Text>
              <TextInput
                autoCorrect={false}
                autoCapitalize="none"
                title={reportTitle}
                placeholder="Description"
                multiline={true}
                onChangeText={reportDescription =>
                  this.setState({ reportDescription })}
                value={this.state.reportDescription}
                style={styles.reportInput}
              />
              <Text style={{ marginTop: 5, color: '#60686d' }}>
                *Average response time is 2 days{' '}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <TouchableOpacity
                title="Cancel"
                onPress={this.showReport}
                style={styles.cancelButton}
              >
                <Text
                  style={{
                    color: '#F9F1EF',
                    fontSize: 16,
                    fontWeight: '600',
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                title="Report"
                onPress={this.sendReport}
                style={styles.reportButton}
              >
                <Text
                  style={{
                    color: '#F9F1EF',
                    fontSize: 16,
                    fontWeight: '600',
                  }}
                >
                  Report
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal
          visible={this.state.isReportStatusVisible}
          transparent
          animationType="slide"
        >
          <View
            style={{
              height: 150,
              borderRadius: 10,
              backgroundColor: '#F1F1F3',
              padding: 20,
              paddingLeft: 10,
            }}
          >
            <Text
              style={{ textAlign: 'center', fontSize: 25, marginBottom: 10 }}
            >
              {this.state.reportStatusText}
            </Text>
            <TouchableOpacity
              style={{
                alignSelf: 'stretch',
                padding: 10,
                backgroundColor: 'red',
                borderRadius: 10,
              }}
              onPress={() => this.setState({ isReportStatusVisible: false })}
            >
              <Text style={{ textAlign: 'center' }}>OK</Text>
            </TouchableOpacity>
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
    margin: 10,
    marginRight: 20,
    marginLeft: 40,
  },
  ReceiveCard: {
    flex: 1,
    padding: 20,
    paddingBottom: 30,
    margin: 10,
    marginRight: 40,
    marginLeft: 20,
  },
  reportInput: {
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderWidth: 0.5,
    borderTopWidth: 0.5,
    borderRadius: 8,
    height: 40,
    borderBottomColor: 'grey',
    borderTopColor: 'grey',
    borderLeftColor: 'grey',
    borderRightColor: 'grey',
    marginLeft: 2,
    marginTop: 5,
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
  },
  reportButton: {
    backgroundColor: '#00bfff',
    borderRadius: 5,
    borderWidth: 1,
    padding: 13,
    borderColor: '#14B28B',
    marginLeft: 5,
  },
  cancelButton: {
    backgroundColor: '#ed5249',
    borderRadius: 5,
    borderWidth: 1,
    padding: 13,
    borderColor: '#14B28B',
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatView);
