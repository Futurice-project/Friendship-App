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
  openMap = location => {
    if (Platform.OS === 'ios') {
      Linking.openURL(`http://maps.apple.com/maps?address=${location}`);
    } else if (Platform.OS === 'android') {
      Linking.openURL(`http://maps.google.com/maps?address=${location}`);
    }
  };

  render = () => {
    const { title, location, date, id } = this.props;
    const { titleTextStyle } = styles;
    return (
      <Card>
        <CardSection>
          <Text>{moment(new Date(date)).format('dddd, Do MMM')}</Text>
        </CardSection>

        <CardSection>
          <TouchableOpacity onPress={() => this.props.openEvent(id)}>
            <Text style={titleTextStyle}>{title}</Text>
          </TouchableOpacity>
        </CardSection>

        <CardSection>
          <TouchableOpacity onPress={() => this.openMap(location)}>
            <Text>{location}</Text>
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
