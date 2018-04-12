import React from 'react';
import { FlatList } from 'react-native';

import EventsDetail from './EventsDetail';

const EventsList = ({ events, onRefresh, isFetching }) => {
  const renderItem = ({ item }) => {
    return (
      <EventsDetail
        title={item.title}
        description={item.description}
        city={item.city}
        address={item.address}
        date={item.eventDate}
        id={item.id}
        srcImage={item.eventImage}
      />
    );
  };

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
