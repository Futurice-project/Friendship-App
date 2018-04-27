import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import EventForm from '../../components/Events/EventForm';
import rest from '../../utils/rest';
import { EventContainer } from '../../components/Layout/Layout';

const mapDispatchToProps = dispatch => ({
  createEvent: formData =>
    dispatch(
      rest.actions.createEvent(
        {},
        { body: formData, headers: { 'Content-Type': 'multipart/form-data' } },
      ),
    ),
  fetchEvents: userId => dispatch(rest.actions.events.get({ userId })),
});

const mapStateToProps = state => ({
  auth: state.auth,
  events: state.events,
});

class EventCreateView extends Component {
  state = {
    hostId: '',
  };
  componentWillMount = () => {
    const hostId = this.props.auth.data.decoded
      ? this.props.auth.data.decoded.id
      : null;
    this.setState({ hostId });
  };

  navigateBack = async () => {
    const backAction = NavigationActions.back();
    this.props.navigation.dispatch(backAction);
    const userId = this.props.auth.data.decoded
      ? this.props.auth.data.decoded.id
      : null;
    await this.props.fetchEvents(userId);
  };

  render() {
    return (
      <EventContainer>
        <KeyboardAwareScrollView
          extraHeight={30}
          enableResetScrollToCoords={false}
          enableOnAndroid={true}
          enableAutoAutomaticScroll={true}
        >
          <EventForm
            navigateBack={this.navigateBack}
            createEvent={this.props.createEvent}
            hostId={this.state.hostId}
            events={this.props.events}
            navigation={this.props.navigation}
            fetchEvents={this.props.fetchEvents}
          />
        </KeyboardAwareScrollView>
      </EventContainer>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventCreateView);
