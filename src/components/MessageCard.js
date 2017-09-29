import React from 'react';
import { Text } from 'react-native';
import { ReceivingCard, SendingCard } from './Layout';

class MessageCard extends React.Component {
  render() {
    if (this.props.isSent) {
      return (
        <SendingCard>
          <Text>{this.props.message}</Text>
        </SendingCard>
      );
    }
    return (
      <ReceivingCard>
        <Text>{this.props.message}</Text>
      </ReceivingCard>
    );
  }
}
export default MessageCard;
