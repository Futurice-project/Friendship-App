import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';

import rest from '../../utils/rest';
import {
  EventContainer,
  DescriptionWrapper,
} from '../../components/Layout/Layout';
import { Description } from '../../components/Layout/TextLayout';

import EventTopPart from '../../components/Events/EventTopPart';

const mapStateToProps = state => ({
  eventDetails: state.eventDetails,
});

const mapDispatchToProps = dispatch => ({
  fetchEvent: eventId => dispatch(rest.actions.eventDetails.get({ eventId })),
});

class EventDetailView extends Component {
  componentDidMount = () => {
    const { eventId } = this.props.navigation.state.params;
    this.props.fetchEvent(eventId);
  };

  render() {
    console.log(this.props.eventDetails);
    const { title, description, location } = this.props.eventDetails.data;

    // if there is no picture for the user we use a default image
    const eventImage = this.props.eventDetails.data.eventImage
      ? {
          uri:
            'data:image/png;base64,' + this.props.eventDetails.data.eventImage,
        }
      : require('../../../assets/img/placeholder/grone.jpg');

    return (
      <EventContainer>
        <EventTopPart
          eventTitle={title}
          location={location}
          srcImage={eventImage}
        />
        <DescriptionWrapper>
          <Description>{description}</Description>
        </DescriptionWrapper>
      </EventContainer>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDetailView);
