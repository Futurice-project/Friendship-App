import React from 'react';
import {
  Text,
  Image,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';

import {
  Details,
  CompatibilityText,
  FrienshipFont,
  LocationText,
  YeahColor,
  NaahColor,
  UsernameText,
} from '../Text';
import Modal from 'react-native-modal';
import waveShape from '../../../assets/img/roundTab/roundTab.png';
import resolveAssetSource from 'resolveAssetSource';
const { width, height } = resolveAssetSource(waveShape);

const MyProfileTopPart = ({
  age,
  emoji,
  genders,
  location,
  navigateBack,
  numberOfNaah,
  numberOfYeah,
  srcImage,
  showModal,
  username,
}) => {
  return (
    <Image style={styles.imageUser} source={srcImage}>
      <View style={styles.backAndSettingsView}>
        <TouchableOpacity onPress={navigateBack} style={styles.backButton}>
          <Text style={{ fontSize: 22 }}> {'<'} </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={showModal} style={styles.settings}>
          <Image
            style={styles.settingsIcon}
            source={require('../../../assets/settingsIcon.png')}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.emojiCircle}>
        <Text style={styles.emoji}>{emoji ? emoji : '✌️'}</Text>
      </View>

      <View
        style={{
          backgroundColor: 'transparent',
          justifyContent: 'flex-end',
          flex: 1,
        }}
      >
        <Image source={waveShape} style={styles.waveShape}>
          <UsernameText style={styles.username}>{username}</UsernameText>
          <CompatibilityText style={{ textAlign: 'center' }}>
            you have
            <YeahColor>
              {' '}
              {numberOfYeah} <FrienshipFont> YEAHS </FrienshipFont>{' '}
            </YeahColor>
            &
            <NaahColor>
              {' '}
              {numberOfNaah} <FrienshipFont> NAAHS </FrienshipFont>{' '}
            </NaahColor>
          </CompatibilityText>
        </Image>
        <View style={{ backgroundColor: '#F9F6F1' }}>
          <Details>
            <LocationText>{location ? location : 'Narnia'}</LocationText>
            {', ' + age + ', '}
            {genders}
          </Details>
        </View>
      </View>
    </Image>
  );
};

export const ProfileTop = ({
  age,
  emoji,
  genders,
  location,
  navigateBack,
  numberOfNaah,
  numberOfYeah,
  srcImage,
  username,
}) => {
  return (
    <Image style={styles.imageUser} source={srcImage}>
      <View style={styles.backAndSettingsView}>
        <TouchableOpacity onPress={navigateBack} style={styles.backButton}>
          <Text style={{ fontSize: 22 }}> {'<'} </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.emojiCircle}>
        <Text style={styles.emoji}>{emoji ? emoji : '✌️'}</Text>
      </View>

      <View
        style={{
          backgroundColor: 'transparent',
          justifyContent: 'flex-end',
          flex: 1,
        }}
      >
        <Image source={waveShape} style={styles.waveShape}>
          <UsernameText style={styles.username}>{username}</UsernameText>
          <CompatibilityText style={{ textAlign: 'center' }}>
            <YeahColor>
              {' '}
              {numberOfYeah} <FrienshipFont> YEAHS </FrienshipFont>{' '}
            </YeahColor>
            &
            <NaahColor>
              {' '}
              {numberOfNaah} <FrienshipFont> NAAHS </FrienshipFont>{' '}
            </NaahColor>{' '}
            in common
          </CompatibilityText>
        </Image>
        <View style={{ backgroundColor: '#F9F6F1' }}>
          <Details>
            <LocationText>{location ? location : 'Narnia'}</LocationText>
            {', ' + age + ', '}
            {genders}
          </Details>
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
  emoji: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    fontSize: Platform.OS === 'android' ? 30 : 40,
    paddingTop: 8,
  },
  username: {
    marginTop: 25,
  },
  waveShape: {
    height: Dimensions.get('window').width * height / width,
    width: Dimensions.get('window').width,
    tintColor: '#F9F6F1',
  },
  imageUser: {
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

export default MyProfileTopPart;
