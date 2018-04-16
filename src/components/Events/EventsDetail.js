import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import ResponsiveImage from 'react-native-responsive-image';
import {
  Text,
  TouchableOpacity,
  Linking,
  Platform,
  StyleSheet,
  Image,
  View,
} from 'react-native';
import moment from 'moment';

import CardSection from './CardSection';
import Card from './Card';

const mapDispatchToProps = dispatch => ({
  openEvent: eventId =>
    dispatch(
      NavigationActions.navigate({
        routeName: 'EventDetailView',
        params: { eventId },
      }),
    ),
});

class EventsDetail extends Component {
  openMap = (city, address) => {
    if (Platform.OS === 'ios') {
      Linking.openURL(`http://maps.apple.com/maps?address=${city}, ${address}`);
    } else if (Platform.OS === 'android') {
      Linking.openURL(
        `http://maps.google.com/maps?address=${city}, ${address}`,
      );
    }
  };

  renderDateAndTime = date => {
    moment.updateLocale('en', {
      calendar: {
        lastDay: '[Yesterday]',
        sameDay: '[Today]',
        nextDay: '[Tomorrow]',
        lastWeek: 'dddd, Do MMM',
        nextWeek: 'dddd, Do MMM',
        sameElse: 'dddd, Do MMM',
      },
    });

    const eventTime = moment.utc(new Date(date)).format('HH:mm');
    let eventDate;
    new Date().getMonth() === new Date(date).getMonth()
      ? (eventDate = moment.utc(new Date(date)).calendar())
      : (eventDate = moment.utc(new Date(date)).format('dddd, Do MMM'));

    if (eventDate == 'Today' || eventDate == 'Tomorrow') {
      return (
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontWeight: 'bold' }}>{eventDate}</Text>
          <Text style={{ marginLeft: 5 }}>{eventTime}</Text>
        </View>
      );
    } else {
      return (
        <View style={{ flexDirection: 'row' }}>
          <Text>{eventDate}</Text>
          <Text style={{ marginLeft: 5 }}>{eventTime}</Text>
        </View>
      );
    }
  };

  render = () => {
    const {
      title,
      description,
      city,
      address,
      date,
      id,
      srcImage,
      emojis,
    } = this.props;
    const { titleTextStyle } = styles;

    // if there is no picture for the user we use a default image
    const eventImage = srcImage
      ? { uri: 'data:image/png;base64,' + srcImage }
      : require('../../../assets/img/placeholder/grone.jpg');

    console.log(emojis);

    return (
      <Card>
        <CardSection>
          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={() => this.props.openEvent(id)}>
              <ResponsiveImage
                source={eventImage}
                initWidth="390"
                initHeight="230"
              />
            </TouchableOpacity>
          </View>
        </CardSection>

        <CardSection>
          <TouchableOpacity onPress={() => this.props.openEvent(id)}>
            <Text style={titleTextStyle}>{title}</Text>
            <Text numberOfLines={1}>{description}</Text>
          </TouchableOpacity>
        </CardSection>

        {/* You can access participants avatars through "emojis" variable */}
        <CardSection>
          <TouchableOpacity onPress={() => this.props.openEvent(id)}>
            <Text>
              {emojis != '' ? emojis.length <= 5 ? (
                emojis
              ) : (
                emojis.slice(0, 5).join('') +
                ' + ' +
                (emojis.length - 5) +
                ' others'
              ) : (
                'No participants'
              )}
            </Text>
          </TouchableOpacity>
        </CardSection>

        <CardSection>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>{this.renderDateAndTime(date)}</View>

            <View style={{ flex: 1 }}>
              <TouchableOpacity onPress={() => this.openMap(city, address)}>
                <Text style={{ textAlign: 'right' }}>
                  {city ? `${city}` : 'Narnia'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </CardSection>
      </Card>
    );
  };
}

const styles = StyleSheet.create({
  titleTextStyle: {
    fontSize: 22,
    fontFamily: 'NunitoSans-Bold',
  },
  imageContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default connect(null, mapDispatchToProps)(EventsDetail);
