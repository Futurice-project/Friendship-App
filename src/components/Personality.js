import styled from 'styled-components/native';
import React from 'react';
import { Image, Dimensions, TouchableOpacity, View, Text } from 'react-native';
import resolveAssetSource from 'resolveAssetSource';

// Import personality images
import placeholder from '../../assets/img/personalities/personalityPlaceholder.png';
import relaxed from '../../assets/img/personalities/3_relaxed_128.png';
import ambitious from '../../assets/img/personalities/3_ambitious_128.png';

//style for the image
const ImageContainer = styled.Image`
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
  color: ${props => {
    return props.titleColor ? props.titleColor : '#2d4359';
  }};
  background-color: transparent;
`;

/**
 * Styled Personality component
 * @param {string} title - Sets the title of the personality
 * @param {function} onPress - Sets the function after clicking on a personality
  */

//add style justoifyContent:'flex-end set it at the end of the view'
export default class Personality extends React.Component {
  state = {
    imageObject: placeholder,
    imageHeight: 0,
    imageWidth: 0,
  };

  componentDidMount() {
    console.log(this.props.image);
    switch (this.props.image) {
      case 'relaxed': {
        const { width, height } = resolveAssetSource(relaxed);
        this.setState({
          imageObject: relaxed,
          imageHeight: height,
          imageWidth: width,
        });
        break;
      }
      case 'ambitious': {
        const { width, height } = resolveAssetSource(ambitious);
        this.setState({
          imageObject: ambitious,
          imageHeight: height,
          imageWidth: width,
        });
        break;
      }
      default: {
        const { width, height } = resolveAssetSource(placeholder);
        this.setState({
          imageObject: placeholder,
          imageHeight: height,
          imageWidth: width,
        });
      }
    }
  }

  render = () => {
    return (
      <View style={{ display: 'flex' }}>
        <TouchableOpacity
          style={{ height: this.state.imageHeight + 10 }}
          onPress={this.props.onPress}
        >
          <ImageContainer
            style={{
              height: this.state.imageHeight,
              width: this.state.imageWidth,
            }}
            source={this.state.imageObject}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text
          style={{
            textAlign: 'center',
            color: '#faf5f0',
            fontSize: 15,
            fontFamily: 'NunitoSans-SemiBold',
          }}
        >
          {this.props.title}
        </Text>
      </View>
    );
  };
}
