import styled from 'styled-components/native';
import React from 'react';

export const Bubble = styled.View`
  background-color: #fff;
  min-height: 132;
  flex-direction: column;
  width: 320;
  align-self: center;
  ${'' /* width: 320 ${Dimensions.get("window").width - 60}; */} margin-bottom: 10;
  border-radius: 33;
  overflow: hidden;
`;
export const Title = styled.Text`
  color: ${props => props.titleColor || '#2d4359'};
  font-weight: 600;
  width: 100;
  height: 25;
  font-family: 'NunitoSans-Regular';
  font-size: 16;
  letter-spacing: 1.5;
  text-align: left;
  padding-left: 20px;
  width: 100%;
`;

const Input = styled.TextInput.attrs({
  underlineColorAndroid: 'transparent',
  multiline: true,
  autoGrow: true,
  numberOfLines: 4,
  textAlignVertical: 'top',
})`
  padding-top: 5;
  justify-content: flex-start;
  font-family: 'NunitoSans-Regular';
  font-size: 14;
  text-align: left;
  color: #9b9b9b;
  padding-left: 20;
  padding-right: 20;
`;

/**
 * Styled DescriptionBubble component
 * @param {string} text - Changes the text title of the
 * @param {string} placeholder - Sets the placeholder text of the button
 * @param {string} value - holds the value of the input
 * @param {function} onChangeText - Sets the function of the input
  */
export default class DescriptionBubble extends React.Component {
  render = () => (
    <Bubble>
      <Title>{this.props.text}</Title>
      <Input
        placeholder={this.props.placeholder}
        value={this.props.value}
        onChangeText={this.props.onChangeText}
      />
    </Bubble>
  );
}
