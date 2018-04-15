import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import EventForm from '../../components/Events/EventForm';
import rest from '../../utils/rest';
import { EventContainer } from '../../components/Layout/Layout';

const mapDispatchToProps = dispatch => ({
  updateEvent: (id, formData) =>
    dispatch(
      rest.actions.updateEvent(
        { id: id },
        { body: formData, headers: { 'Content-Type': 'multipart/form-data' } },
      ),
    ),
  deleteEvent: id => dispatch(rest.actions.deleteEvent({ id })),
  fetchEvents: userId => dispatch(rest.actions.events.get({ userId })),
});

const mapStateToProps = state => ({
  events: state.events,
});

class EventEditView extends Component {
  navigateBack = () => {
    const backAction = NavigationActions.back();
    this.props.navigation.dispatch(backAction);
  };

  deleteEvent = async id => {
    await this.props.deleteEvent(id);
    this.props.navigation.navigate('Events');
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
            edit
            eventDetails={this.props.navigation.state.params.eventDetails}
            navigateBack={this.navigateBack}
            updateEvent={this.props.updateEvent}
            deleteEvent={this.deleteEvent}
            navigation={this.props.navigation}
            events={this.props.events}
            fetchEvents={this.props.fetchEvents}
          />
        </KeyboardAwareScrollView>
      </EventContainer>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventEditView);
