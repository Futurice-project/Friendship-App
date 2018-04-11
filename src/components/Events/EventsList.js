import React from 'react';
import { FlatList } from 'react-native';

import EventsDetail from './EventsDetail';

const EventsList = ({ events, onRefresh, isFetching }) => {
  const renderItem = ({ item }) => (
    <EventsDetail
      title={item.title}
      city={item.city}
      address={item.address}
      date={item.eventDate}
      id={item.id}
    />
  );

  const keyExtractor = events => events.id;

  return (
    <FlatList
      data={events.data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      refreshing={isFetching}
      onRefresh={onRefresh}
    />
  );
};

export default EventsList;
