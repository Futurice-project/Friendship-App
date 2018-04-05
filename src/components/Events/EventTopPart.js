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

import moment from 'moment';
import { Details, LocationText, EventTitleText } from '../Layout/TextLayout';
import waveShape from '../../../assets/img/roundTab/roundTab.png';
import resolveAssetSource from 'resolveAssetSource';

const { width, height } = resolveAssetSource(waveShape);

const EventTopPart = props => {
  const {
    eventTitle,
    city,
    address,
    showModal,
    srcImage,
    navigateBack,
    isHost,
    eventDate,
  } = props;

  const displaySettingsButton = () => {
    return (
      <TouchableOpacity onPress={showModal} style={styles.settings}>
        <Image
          style={styles.settingsIcon}
          source={require('../../../assets/settingsIcon.png')}
        />
      </TouchableOpacity>
    );
  };

  const openMap = (city, address) => {
    if (Platform.OS === 'ios') {
      Linking.openURL(`http://maps.apple.com/maps?address=${city}, ${address}`);
    } else if (Platform.OS === 'android') {
      Linking.openURL(
        `http://maps.google.com/maps?address=${city}, ${address}`,
      );
    }
  };

  const renderDateAndTime = date => {
    console.log('EVENT DATE FROM FETCH', date);
    const eventTime = moment.utc(date).format('HH:mm');
    console.log('EVENT TOM FROM FETCH', eventTime);

    let eventDate;
    new Date().getMonth() === new Date(date).getMonth()
      ? (eventDate = moment.utc(new Date(date)).format('dddd, Do'))
      : (eventDate = moment.utc(new Date(date)).format('dddd, Do MMM'));
    return (
      <Details>
        <LocationText>{`${eventDate}, ${eventTime}`}</LocationText>
      </Details>
    );
  };

  return (
    <View>
      <Image style={styles.imageEvent} source={srcImage} />
      <View style={styles.backAndSettingsView}>
        <TouchableOpacity onPress={navigateBack} style={styles.backButton}>
          <Text style={{ fontSize: 22 }}> {'<'} </Text>
        </TouchableOpacity>
        {isHost ? displaySettingsButton() : null}
      </View>

      <View
        style={{
          backgroundColor: 'transparent',
          justifyContent: 'flex-end',
          flex: 1,
          position: 'absolute',
          bottom: 0,
        }}
      >
        <Image source={waveShape} style={styles.waveShape} />
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: 70,
            paddingBottom: 15,
            top: '25%',
            left: '35%',
            position: 'absolute',
          }}
        >
          <EventTitleText style={styles.eventTitle}>
            {eventTitle}
          </EventTitleText>
          <View style={{ backgroundColor: '#F9F6F1' }}>
            {renderDateAndTime(eventDate)}
            <TouchableOpacity onPress={() => openMap(city, address)}>
              <Details>
                <LocationText>
                  {city && address ? `${city}, ${address}` : 'Narnia'}
                </LocationText>
              </Details>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    marginTop: 10,
    marginLeft: 5,
    width: Dimensions.get('window').width - 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
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
