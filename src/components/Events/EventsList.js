import React from 'react';
import { FlatList } from 'react-native';

import EventsDetail from './EventsDetail';

const EventsList = ({ events }) => {
  const renderItem = ({ item }) => (
    <EventsDetail
      title={item.title}
      city={item.city}
      address={item.address}
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
      refreshing={false}
      onRefresh={renderItem}
    />
  );
};

export default EventsList;
