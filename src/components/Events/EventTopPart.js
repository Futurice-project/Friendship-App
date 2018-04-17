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
import Icon from 'react-native-vector-icons/Ionicons';
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
    <View style={styles.wrapper}>
      <Image style={styles.imageEvent} source={srcImage} />
      <View style={styles.backAndSettingsView}>
        <TouchableOpacity onPress={navigateBack}>
          <Icon name="md-arrow-back" size={26} style={styles.backButton} />
        </TouchableOpacity>
        {isHost ? displaySettingsButton() : null}
      </View>

      <View
        style={{
          backgroundColor: 'transparent',
          justifyContent: 'center',
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
            left: '10%',
            right: '10%',
            position: 'absolute',
          }}
        >
          <EventTitleText style={styles.eventTitle}>
            {eventTitle}
          </EventTitleText>
          <View style={{ backgroundColor: '#F9F6F1' }}>
            <View style={styles.detailView}>
              <Image
                source={require('../../../assets/icon_calendar_dark.png')}
              />
              <Details style={{ marginLeft: 5 }}>
                {renderDateAndTime(eventDate)}
              </Details>
            </View>

            <TouchableOpacity onPress={() => openMap(city, address)}>
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
  wrapper: {},
  eventTitle: {
    marginTop: 25,
  },
  waveShape: {
    height: Dimensions.get('window').width * height / width + 35,
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
  detailView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  backButton: {
    paddingTop: 10,
    paddingLeft: 10,
    padding: 20,
    backgroundColor: 'transparent',
  },
  settingsIcon: {
    width: 24,
    height: 24,
    tintColor: '#4A4A4A',
  },
});

export default EventTopPart;
