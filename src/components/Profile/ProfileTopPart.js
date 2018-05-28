import React from 'react';
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  CompatibilityText,
  Details,
  FrienshipFont,
  LocationText,
  NaahColor,
  UsernameText,
  YeahColor,
} from '../Layout/TextLayout';

import Icon from 'react-native-vector-icons/Ionicons';
import waveShape from '../../../assets/img/curve/curve.png';
import resolveAssetSource from 'resolveAssetSource';

const { width, height } = resolveAssetSource(waveShape);

const ProfileTopPart = props => {
  const {
    birthyear,
    avatar,
    location,
    navigateBack,
    numberOfNaah,
    numberOfYeah,
    srcImage,
    showModal,
    username,
    myProfile,
    genderList,
    showEditForm,
  } = props;

  const getAge = () => {
    const parsedBirthYear = parseInt(birthyear);
    const now = new Date();
    let age = now.getFullYear() - parsedBirthYear;

    const early = [0, 1, 2, 3];
    const mid = [4, 5, 6];
    const late = [7, 8, 9];
    let ageName = '';
    const lastDigit = age.toString().substr(age.toString().length - 1);
    if (age < 20) {
      ageName = age + ' years old';
    } else if (early.indexOf(parseInt(lastDigit)) > -1) {
      ageName = 'early ' + (age - parseInt(lastDigit)) + "'s";
    } else if (mid.indexOf(parseInt(lastDigit)) > -1) {
      ageName = 'mid ' + (age - parseInt(lastDigit)) + "'s";
    } else if (late.indexOf(parseInt(lastDigit)) > -1) {
      ageName = 'late ' + (age - parseInt(lastDigit)) + "'s";
    } else {
      ageName = "It's a mystery";
    }
    return ageName;
  };

  const getGenders = () => {
    return genderList
      ? genderList.map(gender => gender && gender.toLowerCase()).join(' and ')
      : 'no gender';
  };

  const renderActionButton = () => {
    if (myProfile) {
      return (
        <TouchableOpacity
          onPress={showModal}
          style={{
            backgroundColor: 'rgb(255, 138, 101)',
            height: 35,
            width: 35,
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 2,
            paddingLeft: 2,
            marginRight: 10,
            alignSelf: 'flex-end',
          }}
        >
          <Icon name="md-settings" size={26} style={styles.backButton} />
        </TouchableOpacity>
      );
    }
  };

  return (
    <View>
      <Image style={styles.imageUser} source={{ uri: srcImage }} />
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          width: '100%',
          position: 'absolute',
          bottom: 0,
          left: 0,
        }}
      >
        <View style={styles.backAndSettingsView}>{renderActionButton()}</View>
        <View style={{ flex: 3, flexDirection: 'column' }}>
          <View style={styles.avatarCircle}>
            <Image
              source={{ uri: avatar }}
              style={{
                width: 64,
                height: 64,
                backgroundColor: 'transparent',
                marginRight: 15,
              }}
            />
          </View>
          <View
            style={{
              backgroundColor: 'transparent',
              flex: 2,
            }}
          >
            <Image
              source={waveShape}
              style={styles.waveShape}
              resizeMode="stretch"
            />
            <View style={{ flex: 3, backgroundColor: '#F9F6F1' }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <UsernameText>
                  {username.length > 15 ? (
                    username.substr(0, 15).concat('…')
                  ) : (
                    username
                  )}
                </UsernameText>
                {myProfile ? (
                  <TouchableOpacity onPress={() => showEditForm()}>
                    <Image
                      source={require('../../../assets/edit.png')}
                      style={{ width: 38, height: 38, tintColor: '#000' }}
                    />
                  </TouchableOpacity>
                ) : null}
              </View>
              <CompatibilityText
                style={{
                  textAlign: 'center',
                  marginBottom: 0,
                }}
              >
                {myProfile ? 'You have ' : null}
                <YeahColor>
                  {numberOfYeah} <FrienshipFont> YEAHS </FrienshipFont>
                </YeahColor>
                &
                <NaahColor>
                  {' ' + numberOfNaah} <FrienshipFont> NAAHS </FrienshipFont>
                </NaahColor>
                {myProfile ? null : ' in common'}
              </CompatibilityText>
              <Details>
                <LocationText>{location ? location : 'Narnia'}</LocationText>
                {', ' + getAge() + ', '}
                {getGenders()}
              </Details>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  avatarCircle: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: 'transparent',
    width: '100%',
  },
  avatar: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    fontSize: Platform.OS === 'android' ? 30 : 40,
    paddingTop: 8,
  },
  waveShape: {
    height: 40,
    width: Dimensions.get('window').width,
    tintColor: '#F9F6F1',
  },
  imageUser: {
    width: Dimensions.get('window').width,
    height: 350,
  },
  backAndSettingsView: {
    marginTop: 10,
    flex: 2,
    flexDirection: 'column',
  },
  backButton: {
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, 0.9)',
  },
});

export default ProfileTopPart;
