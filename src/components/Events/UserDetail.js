import React from 'react';
import { Text, View, Image, Linking } from 'react-native';

import Card from './Card';
import CardSection from './CardSection';

const UserDetail = () => {
  //user in props
  //const { title, artist, thumbnail_image, image, url } = album;
  //const { name, image } = user;
  const image = require('../../../assets/img/placeholder/grone.jpg');
  const {
    thumbnailStyle,
    headerContentStyle,
    thumbnailContainerStyle,
    headerTextStyle,
    imageStyle,
  } = styles;

  return (
    <Card>
      <CardSection>
        <View style={thumbnailContainerStyle}>
          <Image
            style={thumbnailStyle}
            source={require('../../../assets/img/placeholder/grone.jpg')}
          />
        </View>
        <View style={headerContentStyle}>
          <Text style={headerTextStyle}>{'Henrik'}</Text>
          <Text>Naahs and Yeah</Text>
        </View>
      </CardSection>
    </Card>
  );
};

const styles = {
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  headerTextStyle: {
    fontSize: 18,
  },
  thumbnailStyle: {
    height: 50,
    width: 50,
  },
  thumbnailContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  imageStyle: {
    height: 350,
    flex: 1,
    width: null,
  },
};

export default UserDetail;
