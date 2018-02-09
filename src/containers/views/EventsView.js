import React, { Component } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import rest from '../../utils/rest';
import { connect } from 'react-redux';
import { IconImage } from '../../components/Layout/Layout';
import EventsHeader from '../../components/Events/EventsHeader';
import EventsList from '../../components/Events/EventsList';

class EventsView extends Component {
  static navigationOptions = {
    title: 'Events',
    header: {
      visible: false,
    },
    tabBarIcon: ({ tintColor }) => (
      <IconImage
        source={require('../../../assets/eventsPicture.png')}
        tintColor={tintColor}
      />
    ),
  };

  componentDidMount = () => {
    this.props.fetchEvents();
  };

  render = () => {
    const { events } = this.props;

    if (events.loading) {
      return <ActivityIndicator />;
    }
    return (
      <View style={{ flex: 1 }}>
        <EventsHeader headerText="Events" />
        <EventsList events={events} />
      </View>
    );
  };
}

const mapStateToProps = state => ({
  events: state.events,
});

const mapDispatchToProps = dispatch => ({
  fetchEvents: () => dispatch(rest.actions.events.get()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventsView);
