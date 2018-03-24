import React, { Component } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import rest from '../../utils/rest';
import { connect } from 'react-redux';
import { IconImage } from '../../components/Layout/Layout';
import EventsHeader from '../../components/Events/EventsHeader';
import EventsList from '../../components/Events/EventsList';

const mapStateToProps = state => ({
  events: state.events,
  auth: state.auth,
  changeOrder: state.changeOrder,
});

const mapDispatchToProps = dispatch => ({
  fetchEvents: userId => {
    dispatch(rest.actions.events.get({ userId }));
  },
});

class EventsView extends Component {
  state = {
    changeOrder: false,
  };
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
    const userId = this.props.auth.data.decoded
      ? this.props.auth.data.decoded.id
      : null;

    this.props.fetchEvents(userId);
  };

  renderContent = () => {
    const { events } = this.props;

    if (!events.loading) {
      return <EventsList events={events} />;
    }

    return <ActivityIndicator />;
  };

  changeSortOrder = () => {};

  render = () => {
    if (!this.props.auth.data.decoded) {
      return (
        <View style={{ marginTop: 30 }}>
          <Text style={{ alignSelf: 'center' }}>You need to sign in!</Text>
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <EventsHeader headerText="Events" />
        <TouchableOpacity onPress={() => this.changeSortOrder()}>
          <Text> Recommended </Text>
        </TouchableOpacity>
        {this.renderContent()}
      </View>
    );
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsView);
