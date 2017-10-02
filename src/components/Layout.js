import React from 'react';
import styled from 'styled-components/native';

import { ScrollView, StyleSheet, TouchableHighlight, Text } from 'react-native';

const styles = StyleSheet.create({
  contentContainerStyle: {
    minHeight: '100%',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  contentContainerStyleTop: {
    minHeight: '100%',
    justifyContent: 'flex-start',
    paddingVertical: 10,
  },
});

export const ViewContainer = styled.ScrollView.attrs({
  contentContainerStyle: styles.contentContainerStyle,
})`
  background-color: #2a343c;
`;

export const ViewContainerLight = styled.ScrollView.attrs({
  contentContainerStyle: styles.contentContainerStyle,
})`
  background-color: #ffffff;
`;

export const ViewContainerTop = styled.ScrollView.attrs({
  contentContainerStyle: styles.contentContainerStyleTop,
})`
  background-color: #ffffff;
`;

export const Padding = styled.View`padding: 16px;`;

export const Centered = styled.View`
  align-items: center;
  justify-content: center;
`;

export const Stretch = styled.View`align-self: stretch;`;

export const FullscreenCentered = Centered.extend`
  flex: 1;
  flex-direction: row;
`;

export const FlexRow = styled.View`
  align-items: center;
  flex-direction: row;
`;

export const AppContainer = styled.View`flex: 1;`;
// test
export const IconImage = styled.Image`
  width: 20;
  height: 20;
  ${props => (props.tintColor ? `tintColor: ${props.tintColor}` : undefined)};
`;

// Styling for inbox
export const MessageCard = styled.View`
  flex-direction: row;
  margin-top: 10px;
  margin-left: 20px;
  margin-right: 20px;
  padding-top: 10px;
  padding-bottom: 12px;
  border: 0px solid #ddd;
  border-bottom-width: 1px;
`;

export const PopUpMenuCard = styled.View`
  align-self: flex-end;
  padding-top: 0px;
`;

export const TouchableHighlightButton = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  padding: 10px;
  border: 1px solid #faf6f0;
  border-bottom-width: 0px;
`;

export const ProfileIconCard = styled.View`
  flex: 1;
  height: 50px;
`;

export const MessageContent = styled.View`flex: 4;`;

export const SignUpWrapper = styled.View`
  flex: 1;
  background-color: #efebe9;
  align-items: center;
`;
export const CircleView = styled.View`
  height: 50px;
  width: 50px;
  ${props => (props.color ? `background-color: ${props.color}` : 'orange')};
  border-radius: 50px;
  justify-content: flex-start;
`;

export const ChatMessageCard = styled.View`
  justify-content: flex-end;
  flex: 1;
`;

export const TextMessageCard = styled.View`
  border-radius: 10;
  padding: 12px;
  max-width: 300px;
  margin-right: 10px;
  margin-top: 5px;
  margin-bottom: 10px;
`;

export const ReceivingCard = TextMessageCard.extend`
  background-color: #f9efcb;
  align-self: flex-start;
  margin-left: 10px;
`;

export const SendingCard = TextMessageCard.extend`
  background-color: #6cc5c9;
  align-self: flex-end;
  margin-right: 10px;
`;

export const TextInputCard = styled.View`
  height: 60px;
  background-color: #f0fafb;
  flex-direction: row;
`;

export const ChatInputButtonCard = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ChatHeaderImage = styled.Image`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

export const PopUpMenuCard = styled.View`
  width: 120;
  ${props => (props.popup ? undefined : 'height: 0')};
  background-color: #f0fafb;
  border-radius: 5;
  position: absolute;
  margin-right: 5;
  top: 0;
  right: 0;
  z-index: 10;
`;

export const TouchableHighlightPadding = styled.TouchableHighlight`
  padding: 10px;
`;

export class TouchableHighlightButton extends React.Component {
  render = () => (
    <TouchableHighlightPadding
      onPress={this.props.onPress}
      underlayColor={'#ddd'}
    >
      <Text>{this.props.label}</Text>
    </TouchableHighlightPadding>
  );
}

// -- Styling for inbox end
