import React from 'react';
import styled from 'styled-components/native';

//Contains that hold the input and the label
const Container = styled.View`padding-left: 20;`;

//background color can be specified with backColor attribute
const Input = styled.TextInput.attrs({
  underlineColorAndroid: 'transparent',
  placeholderTextColor: '#2d4359',
  secureTextEntry: props => props.secure,
})`
  background-color: ${props => props.backColor || '#fff'};
  color: #4a4a4a;
  font-size: 13;
  border-radius: 27;
  font-family: 'NunitoSans-Regular';
  letter-spacing: 1.59;
  border-bottom-width: 2;
  padding-left: 20px;
  text-align: left;
  height: 40;
  width: 300;
`;
//this set the line inside the input
const HorizontalLine = styled.View`
  border-top-width: 1;
  position: relative;
  bottom: 10;
  border-style: solid;
  border-color: #2d4359;
  margin-right: 20px;
  margin-left: 20px;
`;
//the hint text is displaed under the input field, not mandatory
const HintText = styled.Text`
    color : #9b9b9b
    height: 25;
    font-size: 14;
    line-height: 25;
    font-family: "NunitoSans-Regular";
    text-align: left;
    padding-left:20px;
    margin-bottom:10px;
`;
//The title is displayed in bold over the input
const InputTitle = styled.Text`
  color: ${props => props.titleColor || '#2d4359'};
  font-weight: 600;
  width: 100;
  height: 25;
  font-family: 'NunitoSans-Regular';
  font-size: 13;
  letter-spacing: 1.5;
  text-align: left;
  padding-left: 20px;
`;
/**
 * Styled TextInput component
 * @param {string} titleColor - Sets the color of the text(optional)
 * @param {string} title - Sets the text of the title
 * @param {boolean} secure - Enable the input to be secure/hidden
 * @param {string} backColor - Sets the background-color of the input(optional)
 * @param {string} placeholder - indicates the value of the field when empty
 * @param {string} value - Sets the value of the Input
 * @param {function} onChangeText - Function when the field is changed
 * @param {string} hint - Sets the value of t below the input
 */
//export our component
export default class TextInput extends React.Component {
  render = () => (
    <Container>
      <InputTitle titleColor={this.props.titleColor}>
        {this.props.title}
      </InputTitle>
      <Input
        //add the secure attribute to hide the text f.e password
        secure={this.props.secure}
        //specify the background color swith the backColor attribute
        backColor={this.props.backColor}
        placeholder={this.props.placeholder}
        value={this.props.value}
        onChangeText={this.props.onChangeText}
      />
      <HorizontalLine />
      <HintText>{this.props.hint}</HintText>
    </Container>
  );
}
