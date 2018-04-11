import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
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
    const eventTime = moment.utc(new Date(date)).format('HH:mm');
    let eventDate;
    new Date().getMonth() === new Date(date).getMonth()
      ? (eventDate = moment.utc(new Date(date)).format('dddd, Do'))
      : (eventDate = moment.utc(new Date(date)).format('dddd, Do MMM'));

    return (
      <CardSection>
        <Text>{eventDate}</Text>
        <Text style={{ marginLeft: 10 }}>{eventTime}</Text>
      </CardSection>
    );
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
    } = this.props;
    const { titleTextStyle } = styles;

    console.log(srcImage);

    // if there is no picture for the user we use a default image
    const eventImage = srcImage
      ? { uri: 'data:image/png;base64,' + srcImage }
      : require('../../../assets/img/placeholder/grone.jpg');

    return (
      <Card>
        <CardSection>
          <TouchableOpacity onPress={() => this.props.openEvent(id)}>
            <Image source={eventImage} style={{ width: 100, height: 200 }} />
          </TouchableOpacity>
        </CardSection>

        <CardSection>
          <TouchableOpacity onPress={() => this.props.openEvent(id)}>
            <Text style={titleTextStyle}>{title}</Text>
            <Text numberOfLines={1}>{description}</Text>
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
    fontSize: 18,
    fontFamily: 'NunitoSans-Bold',
  },
});

export default connect(null, mapDispatchToProps)(EventsDetail);
