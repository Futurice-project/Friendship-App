import styled from 'styled-components/native';
import React from 'react';
import { Image, Dimensions } from 'react-native';

//item is align at the bottom
//TODO : few pixels are still under the image

const ImageContainer = styled.Image.attrs({
  //TODO fix other color paramter
  tintColor: props => props.imageTint,
})`
  justify-content: flex-end;
  position: relative;
  margin-bottom: 0;
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  justifycontent: center;
  alignitems: center;
`;

export default class RoundTab extends React.Component {
  render = () => (
    //Image will render depending on the screen size -> Dimensions plugin
    <ImageContainer
      imageTint={this.props.imageTint}
      style={{
        height: Dimensions.get('window').height / 5,
        width: Dimensions.get('window').width,
      }}
      //tint color allows you to change the color of the object
      source={require('../images/greenTab.png')}
      resizeMode="contain"
    >
      {this.props.children}
    </ImageContainer>
  );
}
