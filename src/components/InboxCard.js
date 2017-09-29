import React from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { TouchableHighlight } from 'react-native';
import {
  MessageCard,
  ProfileIconCard,
  MessageContent,
  CircleView,
} from './Layout';
import { SenderName, LastMessage, CenterIconText } from './Text';

const mapDispatchToProps = dispatch => ({
  openChatView: (roomID, name) =>
    dispatch(
      NavigationActions.navigate({
        routeName: 'ChatView',
        params: { roomID, name },
      }),
    ),
});

class InboxCard extends React.Component {
  render() {
    return (
      <TouchableHighlight
        onPress={() => this.props.openChatView(2, this.props.name)}
        underlayColor={'#ddd'}
      >
        <MessageCard>
          <ProfileIconCard>
            <CircleView color={this.props.color}>
              <CenterIconText>{this.props.name.charAt(0)}</CenterIconText>
            </CircleView>
          </ProfileIconCard>
          <MessageContent>
            <SenderName>{this.props.name}</SenderName>
            <LastMessage>{this.props.message}</LastMessage>
          </MessageContent>
        </MessageCard>
      </TouchableHighlight>
    );
  }
}

export default connect(null, mapDispatchToProps)(InboxCard);
