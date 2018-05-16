import React from 'react';
import {
  Dimensions,
  Image,
  Linking,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import { Details, EventTitleText, LocationText } from '../Layout/TextLayout';
import waveShape from '../../../assets/img/curve/curve.png';
import resolveAssetSource from 'resolveAssetSource';

const { width, height } = resolveAssetSource(waveShape);

const EventTopPart = props => {
  const {
    eventTitle,
    city,
    address,
    srcImage,
    navigateBack,
    isHost,
    eventDate,
  } = props;

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
    const eventTime = moment.utc(date).format('HH:mm');

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
        <View style={styles.backAndSettingsView}>
          <TouchableOpacity
            onPress={navigateBack}
            style={{
              backgroundColor: 'rgb(255, 138, 101)',
              height: 35,
              width: 35,
              borderRadius: 25,
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 10,
            }}
          >
            <Icon name="md-arrow-back" size={26} style={styles.backButton} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 2,
            backgroundColor: 'transparent',
            justifyContent: 'center',
          }}
        >
          <Image
            source={waveShape}
            style={styles.waveShape}
            resizeMode="stretch"
          />
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              backgroundColor: '#F9F6F1',
            }}
          >
            <EventTitleText style={{ paddingBottom: 10 }}>
              {eventTitle}
            </EventTitleText>
            <View style={styles.detailView}>
              <Image
                source={require('../../../assets/icon_calendar_dark.png')}
              />
              <Details style={{ marginLeft: 5 }}>
                {renderDateAndTime(eventDate)}
              </Details>
            </View>
            <TouchableOpacity
              style={{ alignItems: 'center' }}
              onPress={() => openMap(city, address)}
            >
              <View style={styles.detailView}>
                <Image
                  source={require('../../../assets/icon_location_dark.png')}
                />
                <Details style={{ marginLeft: 5 }}>
                  <LocationText>
                    {city && address ? `${city}, ${address}` : 'Narnia'}
                  </LocationText>
                </Details>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  waveShape: {
    height: 40,
    width: Dimensions.get('window').width,
    tintColor: '#F9F6F1',
  },
  imageEvent: {
    width: Dimensions.get('window').width,
    height: 350,
  },
  backAndSettingsView: {
    marginTop: 10,
    marginLeft: 5,
    width: Dimensions.get('window').width - 10,
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  backButton: {
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  settingsIcon: {
    width: 24,
    height: 24,
    tintColor: '#4A4A4A',
  },
});

export default EventTopPart;
