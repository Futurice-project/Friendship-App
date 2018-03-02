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
import EventBottomPart from '../../components/Events/EventBottomPart';

const mapStateToProps = state => ({
  auth: state.auth,
  eventDetails: state.eventDetails,
  eventParticipants: state.eventParticipants,
  eventPersonalities: state.eventPersonalities,
  eventTags: state.eventTags,
  eventParticipation: state.eventParticipation,
});

const mapDispatchToProps = dispatch => ({
  fetchEvent: eventId => dispatch(rest.actions.eventDetails.get({ eventId })),
  fetchEventParticipants: (eventId, userId) =>
    dispatch(rest.actions.eventParticipants.get({ eventId, userId })),
  fetchEventPersonalities: eventId =>
    dispatch(rest.actions.eventPersonalities.get({ eventId })),
  fetchEventTags: eventId => dispatch(rest.actions.eventTags.get({ eventId })),
  fetchEventParticipation: (eventId, userId) =>
    dispatch(rest.actions.eventParticipation.get({ eventId, userId })),
  joinEvent: (eventId, userId) =>
    dispatch(rest.actions.eventParticipation.post({ eventId, userId })),
  leaveEvent: (eventId, userId) =>
    dispatch(rest.actions.eventParticipation.delete({ eventId, userId })),
});

class EventDetailView extends Component {
  state = {
    loaded: false,
  };

  componentDidMount = () => {
    const { eventId } = this.props.navigation.state.params;
    const userId = this.props.auth.data.decoded
      ? this.props.auth.data.decoded.id
      : null;
    this.props.fetchEvent(eventId);
    this.props.fetchEventParticipants(eventId, userId);
    this.props.fetchEventPersonalities(eventId);
    this.props.fetchEventTags(eventId);
    this.props.fetchEventParticipation(eventId, userId);
  };

  componentWillReceiveProps(nextProps) {
    // render the event details when we have the data.
    if (
      !nextProps.eventDetails.loading &&
      !nextProps.eventParticipants.loading &&
      !nextProps.eventPersonalities.loading &&
      !nextProps.eventTags.loading &&
      !nextProps.eventParticipation.loading
    ) {
      this.setState({
        loaded: true,
      });
    }
  }
  async handleButtonPress(eventId, userId) {
    this.setState({
      loaded: false,
    });
    if (this.props.eventParticipation.data.data === true) {
      await this.props.leaveEvent(eventId, userId);
    } else {
      await this.props.joinEvent(eventId, userId);
    }
    this.props.fetchEventParticipation(eventId, userId);
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
      const { eventId } = this.props.navigation.state.params;
      const userId = this.props.auth.data.decoded
        ? this.props.auth.data.decoded.id
        : null;
      console.log(this.props.eventParticipation);
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
          <EventBottomPart
            participants={this.props.eventParticipants}
            personalities={this.props.eventPersonalities}
            tags={this.props.eventTags}
            onButtonPress={() => this.handleButtonPress(eventId, userId)}
            participation={this.props.eventParticipation}
          />
        </EventContainer>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDetailView);
