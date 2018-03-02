import React from 'react';
import ProgressBar from './ProgressBar';
import styled from 'styled-components/native/index';

export default class SignupHeader extends React.Component {
  render() {
    return (
      <HeaderWrapper backgroundStyle={this.props.backgroundStyle}>
        <ProgressBar steps={this.props.processStage} />
        <SignUpTitle>YOUR PROFILE</SignUpTitle>
      </HeaderWrapper>
    );
  }
}

const HeaderWrapper = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${props =>
    props.backgroundStyle === 'light' ? '#f9f7f6' : '#efebe9'};
`;

const SignUpTitle = styled.Text`
  width: 320;
  height: 45;
  font-family: 'Friendship_version_2';
  font-size: 40;
  line-height: 45;
  text-align: justify;
  color: #839297;
  margin-left: 30;
  margin-right: 10;
  margin-top: 37;
`;
