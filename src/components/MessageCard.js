import React from 'react';
import { Text } from 'react-native';
import { ReceivingCard, SendingCard } from './Layout';
import { TimeText } from './Text';

class MessageCard extends React.Component {
  renderTime = () => {
    return this.props.date.slice(11, 16);
  };

  render() {
    if (this.props.isSent) {
      return (
        <SendingCard>
          <Text>{this.props.message}</Text>
          <TimeText>{this.renderTime()}</TimeText>
        </SendingCard>
      );
    }
    return (
      <ReceivingCard>
        <Text>{this.props.message}</Text>
        <TimeText>{this.renderTime()}</TimeText>
      </ReceivingCard>
    );
  }
}
export default MessageCard;
