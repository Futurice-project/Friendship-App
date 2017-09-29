import styled from 'styled-components/native';
import React from 'react';

//style for the button
export const LabelButton = styled.TouchableOpacity`
  width: 150;
  height: 50;
  border-radius: 100;
  justify-content: center;
  background-color: ${props => {
    if (props.disabled === true) {
      return 'rgba(179, 171, 171, 0.5)';
    } else {
      if (props.selected === true) {
        return '#ed7a5f';
      } else {
        if (props.dark === true) {
          return '#3b3b3d';
        } else {
          return '#faf6f0';
        }
      }
    }
  }};
`;
//style for the text in the label
export const LabelText = styled.Text`
  font-family: 'NunitoSans-Regular';
  font-size: 14;
  letter-spacing: 1.71;
  text-align: left;
  padding-left: 20px;
  color: ${props => {
    if (props.disabled === true) {
      return '#3b3b3d';
    } else {
      if (props.selected === true) {
        return '#2a343c';
      } else {
        if (props.dark === true) {
          return '#faf5f0';
        } else {
          return '#2a343c';
        }
      }
    }
  }};
`;
/**
 * Styled Label component
 * @param {boolean} dark - Indicating button color scheme
 * @param {boolean} disabled - Enable or disable the label
 * @param {boolean} selected - Changes with the state of the label
 * @param {string} title - Label's text
 * @param {function} onPress - Sets the fucntion -->change the label's state
 */
export default class Label extends React.Component {
  render = () => (
    <LabelButton
      disabled={this.props.disabled}
      dark={this.props.dark}
      selected={this.props.selected}
      onPress={this.props.onPress}
    >
      <LabelText
        disabled={this.props.disabled}
        dark={this.props.dark}
        selected={this.props.selected}
      >
        {this.props.title}
      </LabelText>
    </LabelButton>
  );
}
