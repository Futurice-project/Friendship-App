import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Linking, Platform } from 'react-native';

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
          <Text>{date}</Text>
        </CardSection>

        <CardSection>
          <Text>{description}</Text>
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

export default EventsDetail;
