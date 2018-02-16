import React from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Text, TouchableHighlight, View } from 'react-native';

const mapStateToProps = state => ({
  currentUserId: state.auth.data.decoded ? state.auth.data.decoded.id : null,
});

const mapDispatchToProps = dispatch => ({
  openChatView: (chatroomId, id, username, userEmoji) =>
    dispatch(
      NavigationActions.navigate({
        routeName: 'ChatView',
        params: { chatroomId, id, username, userEmoji },
      }),
    ),
});

class InboxCard extends React.Component {
  state = {
    time: '',
  };

  componentDidMount() {
    let messArr = this.props.data.messages;
    if (messArr.length !== 0) {
      for (let message of messArr) {
        console.log(message.read);
      }
    }
    this.getTime();
  }

  getTime = () => {
    const { messages } = this.props.data;
    const msgTime = new Date(messages[messages.length - 1].chat_time);
    if (msgTime) {
      const msgDate = msgTime.getDate();
      const msgMonth = msgTime.getMonth();
      const msgYear = msgTime.getFullYear();
      const now = new Date();
      const diff =
        Math.abs(now.getTime() - msgTime.getTime()) / (1000 * 60 * 60 * 24);

      let time = '';

      const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ];
      const month_names = [
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
        time = month_names[msgMonth] + ' ' + msgDate + ' ' + msgYear; //not same year
      } else if (now.getFullYear() === msgYear && diff > 7) {
        time = month_names[msgMonth] + ' ' + msgDate; //if not within a week
      } else if (now.getFullYear() === msgYear && diff <= 7) {
        time = days[msgTime.getDay()]; //day of week
      } else if (
        now.getFullYear() === msgYear &&
        now.getMonth() === msgMonth &&
        now.getDate() === msgDate
      ) {
        time = timeArr[0] ? timeArr[0] + ':' + timeArr[1] : ''; //today
      } else if (now.getTime() - msgTime.getTime() < 0) {
        time =
          month_names[msgMonth] +
          ' ' +
          msgDate +
          ' ' +
          msgYear +
          ' ' +
          msgTime.toTimeString().split(' ')[0];
      }
      this.setState({ time });
    }
  };

  render() {
    const { creator, receiver, messages } = this.props.data;
    const totalUnreadMessages = messages.filter(
      message => message.read === false,
    );
    const lastMessage = messages[messages.length - 1];
    const lastMessageText =
      lastMessage.text_message.length > 35
        ? lastMessage.text_message.slice(0, 35) + '...'
        : lastMessage.text_message;
    const userId =
      this.props.currentUserId === creator.id ? receiver.id : creator.id;
    const username =
      this.props.currentUserId === creator.id
        ? receiver.username
        : creator.username;
    const emoji =
      this.props.currentUserId === creator.id ? receiver.emoji : creator.emoji;
    return (
      <TouchableHighlight
        onPress={() =>
          this.props.openChatView(this.props.data.id, userId, username, emoji)}
        underlayColor={'#ddd'}
      >
        <View style={styles.inboxCard}>
          <View style={styles.inboxCardIcon}>
            <View style={styles.iconHolder}>
              <Text style={styles.userEmoji}>{emoji}</Text>
            </View>
          </View>
          <View style={styles.inboxCardContent}>
            <View style={styles.inboxCardHeader}>
              <Text style={styles.inboxCardName}>{username}</Text>
              <Text style={styles.inboxCardTime}>{this.state.time}</Text>
            </View>
            <Text style={styles.inboxCardMessage}>
              ( {totalUnreadMessages.length} unread messages )
            </Text>
            <Text style={styles.inboxCardMessage}>{lastMessageText}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = {
  inboxCard: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 24,
  },
  inboxCardHeader: {
    flexDirection: 'row',
  },
  inboxCardName: {
    fontSize: 18,
    color: '#4a4a4a',
  },
  inboxCardTime: {
    position: 'absolute',
    top: 0,
    right: 20,
    fontSize: 10,
    color: '#5c5c5c',
  },
  inboxCardMessage: {
    fontSize: 13,
    color: '#4a4a4a',
  },
  inboxCardIcon: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconHolder: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderColor: '#e8e9e8',
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userEmoji: {
    fontSize: 20,
    padding: 8,
  },
  inboxCardContent: {
    flex: 6,
    justifyContent: 'center',
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(InboxCard);
