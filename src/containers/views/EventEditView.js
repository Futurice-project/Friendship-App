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
});

class EventEditView extends Component {
  navigateBack = () => {
    const backAction = NavigationActions.back();
    this.props.navigation.dispatch(backAction);
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
            deleteEvent={this.props.deleteEvent}
          />
        </KeyboardAwareScrollView>
      </EventContainer>
    );
  }
}

export default connect(null, mapDispatchToProps)(EventEditView);
