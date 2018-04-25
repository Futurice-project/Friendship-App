import React from 'react';
import { FlatList } from 'react-native';

import EventsDetail from './EventsDetail';

const EventsList = ({
  events,
  onRefresh,
  isFetching,
  eventParticipantsNum,
}) => {
  console.log('Events list', events);
  const renderItem = ({ item }) => {
    const emojis = [];
    eventParticipantsNum.data.data.map(emojiObject => {
      if (emojiObject.eventId === item.id) {
        emojis.push(emojiObject.emoji);
      }
    });

    return (
      <EventsDetail
        title={item.title}
        description={item.description}
        city={item.city}
        address={item.address}
        date={item.eventDate}
        id={item.id}
        srcImage={item.eventImage}
        emojis={emojis}
      />
    );
  };

  const keyExtractor = event => event.id;

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
