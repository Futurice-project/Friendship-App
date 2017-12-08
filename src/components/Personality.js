import styled from 'styled-components/native';
import React from 'react';
import { Image, Dimensions, TouchableOpacity, View, Text } from 'react-native';
import resolveAssetSource from 'resolveAssetSource';

// Import personality images
import placeholder from '../../assets/img/personalities/personalityPlaceholder.png';
import freeThinker from '../../assets/img/personalities/1_freethinker_128.png';
import freeThinkerSmall from '../../assets/img/personalities/1_freethinker_60.png';
import religion from '../../assets/img/personalities/1_religion_128.png';
import religionSmall from '../../assets/img/personalities/1_religion_60.png';
import openMinded from '../../assets/img/personalities/2_openminded_128.png';
import openMindedSmall from '../../assets/img/personalities/2_openminded_60.png';
import traditional from '../../assets/img/personalities/2_traditional_128.png';
import traditionalSmall from '../../assets/img/personalities/2_traditional_60.png';
import ambitious from '../../assets/img/personalities/3_ambitious_128.png';
import ambitiousSmall from '../../assets/img/personalities/3_ambitious_60.png';
import relaxed from '../../assets/img/personalities/3_relaxed_128.png';
import relaxedSmall from '../../assets/img/personalities/3_relaxed_60.png';
import chillOut from '../../assets/img/personalities/4_chillout_128.png';
import chillOutSmall from '../../assets/img/personalities/4_chillout_60.png';
import goingOut from '../../assets/img/personalities/4_goingout_128.png';
import goingOutSmall from '../../assets/img/personalities/4_goingout_60.png';

//style for the image
const ImageContainer = styled.Image`
  margin-bottom: 0;
  right: 0;
  left: 0;
  ${'' /* without the -5, a space is below the image-->need further investigation */} bottom: -5;
  align-self: center;
`;

//style for the text of the button
const ButtonText = styled.Text`
  font-family: 'NunitoSans-SemiBold';
  font-size: 10;
  text-align: center;
  color: ${props => {
    return props.titleColor ? props.titleColor : '#91999f';
  }};
  background-color: transparent;
`;

/**
 * Styled Personality component
 * @param {string} title - Sets the title of the personality
 * @param {function} onPress - Sets the function after clicking on a personality
  */
export default class Personality extends React.Component {
  state = {
    imageObject: placeholder,
    imageHeight: 0,
    imageWidth: 0,
  };

  /**
   * When the component is mounting we switch images based on the set text name
   * in this.props.image
   */
  componentDidMount() {
    switch (this.props.image) {
      case 'relaxed': {
        const { width, height } = resolveAssetSource(
          this.props.profile ? relaxedSmall : relaxed,
        );
        this.setState({
          imageObject: relaxed,
          imageHeight: height,
          imageWidth: width,
        });
        break;
      }
      case 'ambitious': {
        const { width, height } = resolveAssetSource(
          this.props.profile ? ambitiousSmall : ambitious,
        );
        this.setState({
          imageObject: ambitious,
          imageHeight: height,
          imageWidth: width,
        });
        break;
      }
      case 'traditional': {
        const { width, height } = resolveAssetSource(
          this.props.profile ? traditionalSmall : traditional,
        );
        this.setState({
          imageObject: traditional,
          imageHeight: height,
          imageWidth: width,
        });
        break;
      }
      case 'open-minded': {
        const { width, height } = resolveAssetSource(
          this.props.profile ? openMindedSmall : openMinded,
        );
        this.setState({
          imageObject: openMinded,
          imageHeight: height,
          imageWidth: width,
        });
        break;
      }
      case 'religion': {
        const { width, height } = resolveAssetSource(
          this.props.profile ? religionSmall : religion,
        );
        this.setState({
          imageObject: religion,
          imageHeight: height,
          imageWidth: width,
        });
        break;
      }
      case 'free thinker': {
        const { width, height } = resolveAssetSource(
          this.props.profile ? freeThinkerSmall : freeThinker,
        );
        this.setState({
          imageObject: freeThinker,
          imageHeight: height,
          imageWidth: width,
        });
        break;
      }
      case 'going out': {
        const { width, height } = resolveAssetSource(
          this.props.profile ? goingOutSmall : goingOut,
        );
        this.setState({
          imageObject: goingOut,
          imageHeight: height,
          imageWidth: width,
        });
        break;
      }
      case 'chilling out': {
        const { width, height } = resolveAssetSource(
          this.props.profile ? chillOutSmall : chillOut,
        );
        this.setState({
          imageObject: chillOut,
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

  /**
   * React native doesn't support letter spacing
   * This function hacks a similair design together
   * @param string
   * @param count
   * @returns {string}
   */
  applyLetterSpacing(string, count = 1) {
    return string.split('').join('\u200A'.repeat(count));
  }

  /**
   * Render the component
   * @returns {XML}
   */
  render = () => {
    return (
      <View style={{ display: 'flex', paddingLeft: 7, paddingRight: 7 }}>
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
        <ButtonText>
          {this.applyLetterSpacing(this.props.title.toUpperCase())}
        </ButtonText>
      </View>
    );
  };
}
