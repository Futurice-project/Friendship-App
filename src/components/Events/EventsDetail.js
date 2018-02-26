import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  Platform,
  StyleSheet,
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
    const eventTime = moment(new Date(date)).format('HH:mm');
    let eventDate;
    new Date().getMonth() === new Date(date).getMonth()
      ? (eventDate = moment(new Date(date)).format('dddd, Do'))
      : (eventDate = moment(new Date(date)).format('dddd, Do MMM'));
    return (
      <CardSection>
        <Text>{eventDate}</Text>
        <Text style={{ marginLeft: 10 }}>{eventTime}</Text>
      </CardSection>
    );
  };

  render = () => {
    const { title, city, address, date, id } = this.props;
    const { titleTextStyle } = styles;
    const eventDate = moment(new Date(date)).format('dddd, Do MMM');
    const eventTime = moment(new Date(date)).format('HH:mm');
    return (
      <Card>
        {this.renderDateAndTime(date)}

        <CardSection>
          <TouchableOpacity onPress={() => this.props.openEvent(id)}>
            <Text style={titleTextStyle}>{title}</Text>
          </TouchableOpacity>
        </CardSection>

        <CardSection>
          <TouchableOpacity onPress={() => this.openMap(city, address)}>
            <Text>{city && address ? `${city}, ${address}` : 'Narnia'}</Text>
          </TouchableOpacity>
        </CardSection>
      </Card>
    );
  };
}

const styles = StyleSheet.create({
  titleTextStyle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default connect(null, mapDispatchToProps)(EventsDetail);
