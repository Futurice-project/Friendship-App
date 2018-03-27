import React from 'react';
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import {
  CompatibilityText,
  Details,
  FrienshipFont,
  LocationText,
  NaahColor,
  UsernameText,
  YeahColor
} from '../Layout/TextLayout';
import waveShape from '../../../assets/img/roundTab/roundTab.png';
import resolveAssetSource from 'resolveAssetSource';

const { width, height } = resolveAssetSource(waveShape);

const ProfileTopPart = props => {
  const {
    birthyear,
    emoji,
    genders,
    location,
    navigateBack,
    numberOfNaah,
    numberOfYeah,
    srcImage,
    showModal,
    username,
    myProfile,
    genderList,
    showEditForm
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

  const displaySettingsButton = () => {
    if (myProfile) {
      return (
        <TouchableOpacity onPress={showModal} style={styles.settings}>
          <Image
            style={styles.settingsIcon}
            source={require('../../../assets/settingsIcon.png')}
          />
        </TouchableOpacity>
      );
    }

    return null;
  };

  return (
    <Image style={styles.imageUser} source={srcImage}>
      <View style={styles.backAndSettingsView}>
        <TouchableOpacity onPress={navigateBack} style={styles.backButton}>
          <Text style={{ fontSize: 22 }}> {'<'} </Text>
        </TouchableOpacity>
        {displaySettingsButton()}
      </View>

      <View style={styles.emojiCircle}>
        <Text style={styles.emoji}>{emoji ? emoji : '✌️'}</Text>
      </View>

      <View
        style={{
          backgroundColor: 'transparent',
          justifyContent: 'flex-end',
          flex: 1
        }}
      >
        <Image source={waveShape} style={styles.waveShape}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 25
            }}
          >
            <UsernameText>{username}</UsernameText>
            {myProfile ? (
              <TouchableOpacity onPress={() => showEditForm()}>
                <Image
                  source={require('../../../assets/edit.png')}
                  style={{ width: 38, height: 38 }}
                />
              </TouchableOpacity>
            ) : null}
          </View>
          <CompatibilityText style={{ textAlign: 'center' }}>
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
        </Image>
        <View style={{ backgroundColor: '#F9F6F1' }}>
          <Details>
            <LocationText>{location ? location : 'Narnia'}</LocationText>
            {', ' + getAge() + ', '}
            {getGenders()}
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
    backgroundColor: '#ffffff'
  },
  emoji: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    fontSize: Platform.OS === 'android' ? 30 : 40,
    paddingTop: 8
  },
  waveShape: {
    height: Dimensions.get('window').width * height / width,
    width: Dimensions.get('window').width,
    tintColor: '#F9F6F1'
  },
  imageUser: {
    width: Dimensions.get('window').width,
    height: Platform.OS === 'android' ? 330 : 250
  },
  backAndSettingsView: {
    marginTop: 5,
    marginRight: 5,
    marginLeft: 5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  backButton: {
    backgroundColor: 'transparent'
  },
  settingsIcon: {
    width: 24,
    height: 24,
    tintColor: '#4A4A4A'
  }
});

export default ProfileTopPart;
