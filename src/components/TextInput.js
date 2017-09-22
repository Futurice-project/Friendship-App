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
  fontfamily: 'NunitoSans-Regular';
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
    fontFamily: "NunitoSans-Regular";
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
  fontfamily: 'NunitoSans-Regular';
  font-size: 13;
  letter-spacing: 1.5;
  text-align: left;
  padding-left: 20px;
`;

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
