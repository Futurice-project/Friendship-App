import React from 'react';
import styled from 'styled-components/native';

/* Styling for button wrapper */
const ButtonWrapper = styled.TouchableOpacity`
  ${props => {
    if (props.primary) {
      return (
        'background-color: rgba(' +
        (props.color === 'light' ? '255, 255, 255, 1' : '94, 104, 109, 1') +
        ');'
      );
    }
  }};

  ${props => {
    if (props.border) {
      return (
        'border : 2px solid ' +
        (props.color === 'light' ? '#ffffff' : '#60686d') +
        ';'
      );
    }
  }};

  height: 47px;
  width: 270px;
  border-radius: 50px;
`;

/* Styling for text wrapper */
const TextWrapper = styled.View`
  padding: 16px;
  align-items: center;
  justify-content: center;
`;

/* Styling for button text */
const ButtonText = styled.Text`
  color: ${props => {
    switch (props.primary) {
      case true:
        return props.color === 'light' ? '#60686d' : '#ffffff';
      default:
        return props.color === 'light' ? '#ffffff' : '#60686d';
    }
  }};
  font-weight: bold;
  ${props => {
    if (props.link) {
      return 'text-decoration-line: underline;';
    }
  }};
`;

export default class Button extends React.Component {
  render = () => (
    <ButtonWrapper
      primary={this.props.primary}
      color={this.props.color}
      border={this.props.border}
    >
      <TextWrapper>
        <ButtonText
          primary={this.props.primary}
          color={this.props.color}
          link={this.props.link}
        >
          {this.props.title}
        </ButtonText>
      </TextWrapper>
    </ButtonWrapper>
  );
}
