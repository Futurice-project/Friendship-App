import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import rest from '../../utils/rest';

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
    return <Text>{'Hello world!'}</Text>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDetailView);
