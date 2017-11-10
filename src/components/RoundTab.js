import styled from 'styled-components/native';
import React from 'react';
import { Image, Dimensions, TouchableOpacity } from 'react-native';
import resolveAssetSource from 'resolveAssetSource';
import image from '../../assets/img/roundTab/roundTab.png';
const { width, height } = resolveAssetSource(image);

//style for the image
const ImageContainer = styled.Image`
  tint-color: ${props => props.tint || '#ff8a65'};
  justify-content: center;
  align-items: center;
`;
//style for the text of the button
const ButtonText = styled.Text`
  height: 27;
  font-family: 'NunitoSans-Regular';
  font-size: 20;
  font-weight: bold;
  text-align: center;
  color: ${props => {
    return props.titleColor ? props.titleColor : '#2d4359';
  }};

  background-color: transparent;
`;

/**
 * Styled RoundTab component
 * @param {string} tint - Changes the color of the image
 * @param {string} title - Sets the text of the button
 * @param {string} titleColor - Set the color of the title
 * @param {boolean} disabled - Set if the button should not be clickable
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
      <TouchableOpacity
        style={{
          width: Dimensions.get('window').width,
          height: this.state.imageHeight,
          justifyContent: 'center',
        }}
        disabled={this.props.disabled}
        onPress={this.props.onPress}
      >
        {this.props.children}
        <ButtonText style={{ color: this.props.titleColor }}>
          {this.props.title}
        </ButtonText>
      </TouchableOpacity>
    </ImageContainer>
  );
}
