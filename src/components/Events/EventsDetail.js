import React, { Component } from 'react';
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

class EventsDetail extends Component {
  openMap = location => {
    if (Platform.OS === 'ios') {
      Linking.openURL(`http://maps.apple.com/maps?address=${location}`);
    } else if (Platform.OS === 'android') {
      Linking.openURL(`http://maps.google.com/maps?address=${location}`);
    }
  };

  render = () => {
    const { description, location, date } = this.props;

    return (
      <Card>
        <CardSection>
          <Text>{moment(new Date(date)).format('dddd, Do MMM')}</Text>
        </CardSection>

        <CardSection>
          <Text style={styles.descriptionTextStyle}>{description}</Text>
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
  descriptionTextStyle: {
    fontSize: 17,
    fontWeight: 'bold',
  },
});

export default EventsDetail;
