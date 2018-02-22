import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, Text, View } from 'react-native';
import { NavigationActions } from 'react-navigation';

import rest from '../../utils/rest';
import {
  EventContainer,
  DescriptionWrapper,
} from '../../components/Layout/Layout';
import { Description } from '../../components/Layout/TextLayout';
import EventTopPart from '../../components/Events/EventTopPart';
import TabEvent from '../../components/Events/TabEvent';

const mapStateToProps = state => ({
  auth: state.auth,
  eventDetails: state.eventDetails,
  eventParticipants: state.eventParticipants,
});

const mapDispatchToProps = dispatch => ({
  fetchEvent: eventId => dispatch(rest.actions.eventDetails.get({ eventId })),
  fetchEventParticipants: (eventId, userId) =>
    dispatch(rest.actions.eventParticipants.get({ eventId, userId })),
});

class EventDetailView extends Component {
  state = {
    loaded: false,
  };

  componentDidMount = () => {
    const { eventId } = this.props.navigation.state.params;
    const personId = this.props.auth.data.decoded
      ? this.props.auth.data.decoded.id
      : null;
    this.props.fetchEvent(eventId);
    this.props.fetchEventParticipants(eventId, personId);
  };

  componentWillReceiveProps(nextProps) {
    // render the event details when we have the data.
    if (
      !nextProps.eventDetails.loading &&
      !nextProps.eventParticipants.loading
    ) {
      this.setState({
        loaded: true,
      });
    }
  }

  navigateBack = () => {
    const backAction = NavigationActions.back();
    this.props.navigation.dispatch(backAction);
  };

  render() {
    if (!this.props.auth.data.decoded) {
      return (
        <View style={{ marginTop: 30 }}>
          <Text style={{ alignSelf: 'center' }}>You need to sign in!</Text>
        </View>
      );
    }
    if (!this.state.loaded) {
      return <ActivityIndicator />;
    } else {
      const { title, description, location } = this.props.eventDetails.data;

      // if there is no picture for the user we use a default image
      const srcImage = this.props.eventDetails.data.eventImage
        ? {
            uri:
              'data:image/png;base64,' +
              this.props.eventDetails.data.eventImage,
          }
        : require('../../../assets/img/placeholder/grone.jpg');

      return (
        <EventContainer>
          <EventTopPart
            eventTitle={title}
            location={location}
            srcImage={srcImage}
            navigateBack={this.navigateBack}
          />
          <DescriptionWrapper>
            <Description>{description}</Description>
          </DescriptionWrapper>
          <TabEvent participants={this.props.eventParticipants} />
        </EventContainer>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDetailView);
