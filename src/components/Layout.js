import React from 'react';
import styled from 'styled-components/native';

import { ScrollView, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  contentContainerStyle: {
    minHeight: '100%',
    justifyContent: 'center',
  },
});

export const ViewContainer = styled.ScrollView.attrs({
  contentContainerStyle: styles.contentContainerStyle,
})`
  background-color: #2a343c;
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

export const ProfileIconCard = styled.View`
  flex: 1;
  height: 50px;
`;

export const MessageContent = styled.View`flex: 4;`;

export const SignUpWrapper = styled.View`
  flex: 1;
  background-color: #faf6f0;
  align-items: center;
`;
