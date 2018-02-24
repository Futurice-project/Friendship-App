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
  eventPersonalities: state.eventPersonalities,
  eventTags: state.eventTags,
});

const mapDispatchToProps = dispatch => ({
  fetchEvent: eventId => dispatch(rest.actions.eventDetails.get({ eventId })),
  fetchEventParticipants: (eventId, userId) =>
    dispatch(rest.actions.eventParticipants.get({ eventId, userId })),
  fetchEventPersonalities: eventId =>
    dispatch(rest.actions.eventPersonalities.get({ eventId })),
  fetchEventTags: eventId => dispatch(rest.actions.eventTags.get({ eventId })),
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
    this.props.fetchEventPersonalities(eventId);
    this.props.fetchEventTags(eventId);
  };

  componentWillReceiveProps(nextProps) {
    // render the event details when we have the data.
    if (
      !nextProps.eventDetails.loading &&
      !nextProps.eventParticipants.loading &&
      !nextProps.eventPersonalities.loading &&
      !nextProps.eventTags.loading
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
      const {
        title,
        description,
        city,
        address,
      } = this.props.eventDetails.data;

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
            address={address}
            city={city}
            srcImage={srcImage}
            navigateBack={this.navigateBack}
          />
          <DescriptionWrapper>
            <Description>{description}</Description>
          </DescriptionWrapper>
          <TabEvent
            participants={this.props.eventParticipants}
            personalities={this.props.eventPersonalities}
            tags={this.props.eventTags}
          />
        </EventContainer>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDetailView);
