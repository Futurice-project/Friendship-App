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

  height: 55px;
  width: ${props => {
    return props.size === 'half' ? '160px' : '270px';
  }};
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
  font-family: 'NunitoSans-SemiBold'
  color: ${props => {
    switch (props.textColor) {
      case 'white':
        return '#ffffff';
      case 'black':
        return '#60686d';
      default:
        return '#87df91';
    }
  }};
  ${props => {
    if (props.underlined) {
      return 'text-decoration-line: underline;';
    }
  }};
  background-color: transparent;
`;

/**
 * Styled button component
 * @param {boolean} primary - Indicating button nature
 * @param {boolean} border - Enable or disable a border
 * @param {string} title - Button's text
 * @param {string} color - Either "light" or "dark"
 * @param {boolean} underlined - Indicating if the button's text is underlined
 * @param {string} size - Either "half" or "full"
 * @param {string} textColor - Either "white", "black" or "green"
 */
export default class Button extends React.Component {
  render = () => (
    <ButtonWrapper
      primary={this.props.primary}
      color={this.props.color}
      border={this.props.border}
      size={this.props.size}
      onPress={this.props.onPress}
    >
      <TextWrapper>
        <ButtonText
          underlined={this.props.underlined}
          textColor={this.props.textColor}
        >
          {this.props.title}
        </ButtonText>
      </TextWrapper>
    </ButtonWrapper>
  );
}
