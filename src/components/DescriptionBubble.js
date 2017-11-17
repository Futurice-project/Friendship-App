import styled from 'styled-components/native';
import React from 'react';
import { Dimensions } from 'react-native';

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
  font-family: 'NunitoSans-Regular';
  font-size: 13;
  letter-spacing: 1.19;
  text-align: left;
  color: #60686d;
  padding-left: 20;
  padding-top: 20;
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
