import styled from 'styled-components/native';
import React from 'react';
import { ImagePicker } from 'expo';
import { Image } from 'react-native';

export default class PhotoBox extends React.Component {
  state = {
    selected: false,
  };

  openImageGallery = async input => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      input.onChange(result);
      this.setState({ selected: true });
    }
  };

  renderPicture(input) {
    console.log('Rendering picture...');
    console.log(input);
    console.log(input.value);
    console.log(input.name);
    console.log(input.picture);
    if (this.state.selected && input.picture) {
      return <Image style={{ width: 93, height: 93 }} source={input.picture} />;
    }
    return <PlusSignText>+</PlusSignText>;
  }

  render() {
    const { input } = this.props;

    console.log('Rendering .... ');
    console.log(input);
    console.log(input.picture);
    console.log('---------------');

    return (
      <Photo onPress={() => this.openImageGallery(input)}>
        {this.renderPicture(input)}
      </Photo>
    );
  }
}

const Photo = styled.TouchableOpacity`
  width: 93;
  height: 93;
  background-color: #e8e9e8;
  margin-right: 15;
  border-width: 1;
  border-color: #839297;
  justify-content: center;
`;

const PlusSignText = styled.Text`
  padding: 0;
  font-size: 50;
  font-weight: 400;
  color: #60686d;
  text-align: center;
`;
