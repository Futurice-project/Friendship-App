import React, { Component } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import rest from '../../utils/rest';
import { connect } from 'react-redux';
import { IconImage } from '../../components/Layout/Layout';
import EventsHeader from '../../components/Events/EventsHeader';
import EventsList from '../../components/Events/EventsList';

const mapStateToProps = state => ({
  events: state.events,
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  fetchEvents: () => dispatch(rest.actions.events.get()),
});

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

  renderContent = () => {
    const { events } = this.props;

    if (!events.loading) {
      return <EventsList events={events} />;
    }

    return <ActivityIndicator />;
  };

  render = () => {
    if (!this.props.auth.data.decoded) {
      return (
        <View style={{ backgroundColor: '#e8e9e8' }}>
          <Text style={{ color: 'red', fontSize: 15 }}>
            You need to sign in!
          </Text>
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <EventsHeader headerText="Events" />
        {this.renderContent()}
      </View>
    );
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsView);
