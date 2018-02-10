import React from 'react';
import { FlatList, View } from 'react-native';

import EventsDetail from './EventsDetail';

const EventsList = ({ events }) => {
  const renderItem = ({ item }) => (
    <EventsDetail
      title={item.title}
      location={item.location}
      date={item.eventDate}
      id={item.id}
    />
  );

  const keyExtractor = event => event.id;

  return (
    <FlatList
      data={events.data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
};

export default EventsList;
