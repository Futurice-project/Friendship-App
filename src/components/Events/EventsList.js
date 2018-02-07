import React, { Component } from 'react';
import { FlatList, View } from 'react-native';

import EventsDetail from './EventsDetail';

// const EventsList = ({ events }) => {
//   const renderEvents = () => {
//     return events.map(event => (
//       <EventsDetail
//         description={event.description}
//         location={event.location}
//         date={event.eventDate}
//       />
//     ));
//   };
//
//   return <FlatList>{renderEvents()}</FlatList>;
// };
//
class EventsList extends Component {
  _renderItem = ({ item }) => (
    <EventsDetail
      description={item.description}
      location={item.location}
      date={item.eventDate}
    />
  );

  _keyExtractor = (item, index) => item.id;

  // render = () => <ScrollView>{this.renderEvents()}</ScrollView>;

  render = () => {
    const { events } = this.props;

    return (
      <FlatList
        data={events.data}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  };
}

export default EventsList;
