import React, { Component } from 'react';
import { ScrollView } from 'react-native';

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
  renderEvents() {
    const { events } = this.props;

    return events.data.map(event => (
      <EventsDetail
        description={event.description}
        location={event.location}
        date={event.eventDate}
        key={event.id}
      />
    ));
  }

  render = () => <ScrollView>{this.renderEvents()}</ScrollView>;
}

export default EventsList;
