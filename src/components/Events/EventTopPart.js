import React from 'react';
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  Linking,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  CompatibilityText,
  Details,
  FrienshipFont,
  LocationText,
  EventTitleText,
} from '../Layout/TextLayout';
import waveShape from '../../../assets/img/roundTab/roundTab.png';
import resolveAssetSource from 'resolveAssetSource';

const { width, height } = resolveAssetSource(waveShape);

const EventTopPart = props => {
  // const {
  //   birthyear,
  //   emoji,
  //   genders,
  //   location,
  //   navigateBack,
  //   numberOfNaah,
  //   numberOfYeah,
  //   srcImage,
  //   showModal,
  //   username,
  //   myProfile,
  //   genderList,
  // } = props;

  const { eventTitle, location, srcImage, navigateBack } = props;

  const displaySettingsButton = () => {
    return (
      <TouchableOpacity style={styles.settings}>
        <Image
          style={styles.settingsIcon}
          source={require('../../../assets/settingsIcon.png')}
        />
      </TouchableOpacity>
    );
  };

  const openMap = location => {
    if (Platform.OS === 'ios') {
      Linking.openURL(`http://maps.apple.com/maps?address=${location}`);
    } else if (Platform.OS === 'android') {
      Linking.openURL(`http://maps.google.com/maps?address=${location}`);
    }
  };

  return (
    <Image style={styles.imageEvent} source={srcImage}>
      <View style={styles.backAndSettingsView}>
        <TouchableOpacity onPress={navigateBack} style={styles.backButton}>
          <Text style={{ fontSize: 22 }}> {'<'} </Text>
        </TouchableOpacity>
        {displaySettingsButton()}
      </View>

      <View
        style={{
          backgroundColor: 'transparent',
          justifyContent: 'flex-end',
          flex: 1,
        }}
      >
        <Image source={waveShape} style={styles.waveShape}>
          <EventTitleText style={styles.eventTitle}>
            {eventTitle}
          </EventTitleText>
        </Image>
        <View style={{ backgroundColor: '#F9F6F1' }}>
          <TouchableOpacity onPress={() => openMap(location)}>
            <Details>
              <LocationText>{location ? location : 'Narnia'}</LocationText>
            </Details>
          </TouchableOpacity>
        </View>
      </View>
    </Image>
  );
};

const styles = StyleSheet.create({
  emojiCircle: {
    alignSelf: 'flex-end',
    marginRight: 5,
    width: 64,
    height: 64,
    borderRadius: 64,
    backgroundColor: '#ffffff',
  },
  eventTitle: {
    marginTop: 25,
  },
  waveShape: {
    height: Dimensions.get('window').width * height / width,
    width: Dimensions.get('window').width,
    tintColor: '#F9F6F1',
  },
  imageEvent: {
    width: Dimensions.get('window').width,
    height: Platform.OS === 'android' ? 330 : 250,
  },
  backAndSettingsView: {
    marginTop: 5,
    marginRight: 5,
    marginLeft: 5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButton: {
    backgroundColor: 'transparent',
  },
  settingsIcon: {
    width: 24,
    height: 24,
    tintColor: '#4A4A4A',
  },
});

export default EventTopPart;
