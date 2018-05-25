import React from 'react';
import ProgressBar from './ProgressBar';
import styled from 'styled-components/native/index';

/** Header for the sign up process
 * @param {string} backgroundStyle - set the header background
 * @param {integer} processStage - set the progressBar progress
 * @param {String} headerTitle - set the title of the header
 **/
export default class SignupHeader extends React.Component {
  render() {
    return (
      <HeaderWrapper backgroundStyle={this.props.backgroundStyle}>
        <ProgressBar
          steps={this.props.processStage}
          color={this.props.backgroundStyle === 'darkblue' ? '#3a4853' : ''}
        />
        <SignUpTitle>{this.props.headerTitle}</SignUpTitle>
      </HeaderWrapper>
    );
  }
}

const HeaderWrapper = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${props => {
    switch (props.backgroundStyle) {
      case 'light':
        return '#f9f7f6';
      case 'darkblue':
        return '#2a343c';
      default:
        return '#efebe9';
    }
  }};
`;

const SignUpTitle = styled.Text`
  width: 100%;
  font-family: 'Friendship_version_2';
  font-size: 40;
  line-height: 45;
  text-align: justify;
  color: #839297;
  margin-left: 30;
  margin-right: 10;
`;
