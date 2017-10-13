import React from 'react';
import styled from 'styled-components/native';
import { ScrollView, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  contentContainerStyle: {
    minHeight: '100%',
    justifyContent: 'center',
  },
  contentContainerStyleTop: {
    minHeight: '100%',
    justifyContent: 'flex-start',
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
export const SmallHeader = styled.Text`
  font-size: 13px;
  letter-spacing: 1.59px;
  text-align: center;
  color: #3b3b3d;
  margin-bottom: 14px;
`;
export const Description = styled.Text`
  font-size: 16px;
  line-height: 24;
  font-weight: 300;
  text-align: center;
  color: #4a4a4a;
  margin-bottom: 14px;
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
