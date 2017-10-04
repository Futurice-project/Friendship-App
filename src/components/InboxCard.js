import React from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { TouchableHighlight, View, Text } from 'react-native';
import {
  MessageCard,
  ProfileIconCard,
  MessageContent,
  CircleView,
  ProfileImage,
} from './Layout';
import { SenderName, GrayText, CenterIconText } from './Text';
import { formatDate } from '../utils/date';

const mapDispatchToProps = dispatch => ({
  openChatView: (roomID, name, avatar, currentUser) =>
    dispatch(
      NavigationActions.navigate({
        routeName: 'ChatView',
        params: { roomID, name, avatar, currentUser },
      }),
    ),
});

class InboxCard extends React.Component {
  renderProfileImage = () => {
    if (this.props.avatar && this.props.avatar !== 'default') {
      return <ProfileImage source={{ uri: this.props.avatar }} />;
    }

    return (
      <ProfileImage
        source={require('../../assets/profile.png')}
        width={30}
        height={30}
        tintColor={'#999'}
      />
    );
  };

  renderDate() {
    const date = new Date(this.props.date);
    const today = new Date();
    const timeDiff = today.getTime() - date.getTime();
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    if (diffDays === 2) return 'yesterday';
    if (diffDays <= 1) return this.props.date.toString().slice(11, 16);
    return formatDate(new Date(this.props.date));
  }

  render() {
    return (
      <TouchableHighlight
        onPress={() =>
          this.props.openChatView(
            this.props.roomID,
            this.props.name,
            this.props.avatar,
            this.props.currentUser,
          )}
        underlayColor={'#ddd'}
      >
        <MessageCard>
          <ProfileIconCard>
            <CircleView>{this.renderProfileImage()}</CircleView>
          </ProfileIconCard>
          <MessageContent>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <SenderName>{this.props.name}</SenderName>
              <GrayText style={{ position: 'absolute', right: 0 }}>
                {this.renderDate()}
              </GrayText>
            </View>
            <GrayText>{this.props.message}</GrayText>
          </MessageContent>
        </MessageCard>
      </TouchableHighlight>
    );
  }
}

export default connect(null, mapDispatchToProps)(InboxCard);
