import React from 'react';
import { View, Text } from 'react-native';

import CardSection from './CardSection';
import Card from './Card';

const EventsDetail = ({ description, location, date }) => {
  return (
    <Card>
      <CardSection>
        <Text>{date}</Text>
      </CardSection>

      <CardSection>
        <Text>{description}</Text>
      </CardSection>

      <CardSection>
        <Text>{location}</Text>
      </CardSection>
    </Card>
  );
};

export default EventsDetail;
