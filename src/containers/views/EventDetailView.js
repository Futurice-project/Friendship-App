import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, Text, View, BackHandler } from 'react-native';
import { NavigationActions } from 'react-navigation';

import rest from '../../utils/rest';
import {
  EventContainer,
  DescriptionWrapper,
} from '../../components/Layout/Layout';
import { Description } from '../../components/Layout/TextLayout';
import EventTopPart from '../../components/Events/EventTopPart';
import EventBottomPart from '../../components/Events/EventBottomPart';
import MyEventModal from '../../components/Events/MyEventModal';

const mapStateToProps = state => ({
  auth: state.auth,
  eventDetails: state.eventDetails,
  eventParticipants: state.eventParticipants,
  eventPersonalities: state.eventPersonalities,
  eventTags: state.eventTags,
  eventParticipation: state.eventParticipation,
  events: state.events,
  eventParticipantsNum: state.eventParticipantsNum,
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
  fetchEventParticipantsNum: () =>
    dispatch(rest.actions.eventParticipantsNum.get()),
  fetchEvents: userId => dispatch(rest.actions.events.get({ userId })),
  openEditForm: eventDetails =>
    dispatch(
      NavigationActions.navigate({
        routeName: 'EventEditView',
        params: { eventDetails },
      }),
    ),
});

class EventDetailView extends Component {
  state = {
    loaded: false,
    isModalVisible: false,
  };
  _showModal = () => this.setState({ isModalVisible: true });

  _hideModal = () => this.setState({ isModalVisible: false });

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

    BackHandler.addEventListener('hardwareBackPress', this.backHandler);
  };

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backHandler);
  }

  backHandler = () => {
    this.navigateBack();
    return true;
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
    await this.props.fetchEventParticipation(eventId, userId);
    await this.props.fetchEventParticipants(eventId, userId);
    await this.props.fetchEventPersonalities(eventId);
    await this.props.fetchEventTags(eventId);
  }

  navigateBack = async () => {
    const backAction = NavigationActions.back();
    this.props.navigation.dispatch(backAction);
    const userId = this.props.auth.data.decoded
      ? this.props.auth.data.decoded.id
      : null;
    await this.props.fetchEvents(userId);
    await this.props.fetchEventParticipantsNum();
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
      const {
        title,
        description,
        city,
        address,
        eventDate,
        eventImage,
      } = this.props.eventDetails.data;

      return (
        <EventContainer>
          <EventTopPart
            eventTitle={title}
            address={address}
            city={city}
            srcImage={eventImage}
            navigateBack={this.navigateBack}
            eventDate={eventDate}
            isHost={this.props.eventDetails.data.hostId === userId}
          />
          <DescriptionWrapper>
            <Description>{description}</Description>
          </DescriptionWrapper>
          <EventBottomPart
            loaded={this.state.loaded}
            participants={this.props.eventParticipants}
            personalities={this.props.eventPersonalities}
            tags={this.props.eventTags}
            showModal={this._showModal}
            onButtonPress={() => this.handleButtonPress(eventId, userId)}
            participation={this.props.eventParticipation}
            isHost={this.props.eventDetails.data.hostId === userId}
            eventFull={this.props.eventDetails.data.maxParticipantNumberExceed}
            currentUser={userId}
            hostId={this.props.eventDetails.data.hostId}
            eventDetails={this.props.eventDetails.data}
            openEditForm={this.props.openEditForm}
          />
        </EventContainer>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDetailView);
