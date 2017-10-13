import styled from 'styled-components/native';
import React from 'react';
import { Image, Dimensions, TouchableOpacity } from 'react-native';
import resolveAssetSource from 'resolveAssetSource';
import image from '../../assets/img/roundTab/roundTab.png';

const { width, height } = resolveAssetSource(image);

//style for the image
const ImageContainer = styled.Image.attrs({
  tintColor: props => props.tint,
})`
  margin-bottom: 0;
  right: 0;
  left: 0;
  ${'' /* without the -5, a space is below the image-->need further investigation */} bottom: -5;
  justify-content: center;
  align-items: center;
`;
//style for the text of the button
const ButtonText = styled.Text`
  width: 230;
  height: 27;
  font-family: 'NunitoSans-Regular';
  font-size: 20;
  font-weight: bold;
  text-align: center;
  color: #2d4359;
`;

/**
 * Styled RoundTab component
 * @param {string} tint - Changes the color of the image
 * @param {string} title - Sets the text of the button
 * @param {function} onPress - Sets the function of the button
  */

//add style justoifyContent:'flex-end set it at the end of the view'
export default class RoundTab extends React.Component {
  state = {
    imageHeight: Dimensions.get('window').width * height / width,
  };

  render = () => (
    //Image will render depending on the screen size -> Dimensions plugin
    <ImageContainer
      tint={this.props.tint}
      style={{
        height: this.state.imageHeight,
        width: Dimensions.get('window').width,
      }}
      //tint color allows you to change the color of the object
      source={require('../../assets/img/roundTab/roundTab.png')}
      resizeMode="contain"
    >
      {/* {this.props.children} */}
      <TouchableOpacity onPress={this.props.onPress}>
        {this.props.children}
        <ButtonText>{this.props.title}</ButtonText>
      </TouchableOpacity>
    </ImageContainer>
  );
}
