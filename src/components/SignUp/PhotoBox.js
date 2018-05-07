import styled from 'styled-components/native';
import React from 'react';
import { ImagePicker, Permissions } from 'expo';
import { Image, Text, TouchableOpacity, View } from 'react-native';

export default class PhotoBox extends React.Component {
  state = {
    selected: false,
    picture: null,
  };

  askPermissionsAsync = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
  };

  openImageGallery = async input => {
    await this.askPermissionsAsync();

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      input.onChange(result);
      this.setState({ selected: true, picture: result });
    }
  };

  renderPicture() {
    if (this.state.picture) {
      return (
        <Image style={{ width: 93, height: 93 }} source={this.state.picture} />
      );
    }
    return <PlusSignText>+</PlusSignText>;
  }

  deletePicture(input) {
    input.onChange({});
    this.setState({ picture: '' });
  }

  render() {
    const { input } = this.props;

    return (
      <View>
        {this.state.picture ? (
          <TouchableOpacity
            style={{
              height: 25,
              width: 25,
              borderRadius: 100,
              backgroundColor: '#6c6c85',
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
              left: 80,
              zIndex: 1,
            }}
            onPress={() => this.deletePicture(input)}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>X</Text>
          </TouchableOpacity>
        ) : null}
        <Photo onPress={() => this.openImageGallery(input)}>
          {this.renderPicture()}
        </Photo>
      </View>
    );
  }
}

const Photo = styled.TouchableOpacity`
  width: 93;
  height: 93;
  background-color: #e8e9e8;
  margin-right: 15;
  margin-top: 15;
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
