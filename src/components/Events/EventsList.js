import React from 'react';
import { FlatList, Image } from 'react-native';

import EventsDetail from './EventsDetail';

const EventsList = ({
  events,
  onRefresh,
  isFetching,
  eventParticipantsNum,
}) => {
  let index = 0;
  const renderItem = ({ item }) => {
    const avatars = [];
    eventParticipantsNum.data.data.map(participant => {
      if (participant.eventId === item.id) {
        avatars.push(
          <Image
            source={{ uri: participant.avatar }}
            style={{ width: 15, height: 15, marginRight: 2 }}
            key={`avatar-${index++}`}
          />,
        );
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
        avatars={avatars}
      />
    );
  };

  const keyExtractor = event => 'list-item-' + event.id;

  return (
    <FlatList
      data={events}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      refreshing={isFetching}
      onRefresh={onRefresh}
      style={{ marginTop: 20, paddingBottom: 20, width: '100%' }}
    />
  );
};

export default EventsList;
