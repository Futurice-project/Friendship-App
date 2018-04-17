import React, { Component } from 'react';
import {
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Button,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Dropdown } from 'react-native-material-dropdown';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';

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
  fetchEvents: userId => dispatch(rest.actions.events.get({ userId })),
  openEventForm: () =>
    dispatch(
      NavigationActions.navigate({
        routeName: 'EventCreateView',
      }),
    ),
});

class EventsView extends Component {
  static navigationOptions = {
    title: 'Events',
    header: {
      visible: true,
    },
    tabBarIcon: ({ tintColor }) => (
      <IconImage
        source={require('../../../assets/eventsPicture.png')}
        tintColor={tintColor}
      />
    ),
  };

  constructor() {
    super();
    this.state = {
      initialOrder: true,
      sorting: 'Default',
    };
  }

  componentDidMount = () => {
    const userId = this.props.auth.data.decoded
      ? this.props.auth.data.decoded.id
      : null;
    this.props.fetchEvents(userId);
  };

  rightText = () => {
    let data = [
      { value: 'Default' },
      { value: 'By time' },
      { value: 'Smallest first' },
      { value: 'Closest first' },
    ];
    return (
      <Dropdown
        dropdownMargins={{ min: 5, max: 15 }}
        dropdownPosition={0}
        pickerStyle={{ width: 220 }}
        containerStyle={{ top: -15, right: 10 }}
        data={data}
        value="Default"
        onChangeText={value => {
          this.setState({ sorting: value });
        }}
      />
    );
  };

  _onRefresh = () => {
    const userId = this.props.auth.data.decoded
      ? this.props.auth.data.decoded.id
      : null;
    this.props.fetchEvents(userId);
  };

  renderEvents = eventsOrder => {
    return (
      <EventsList
        events={eventsOrder}
        isFetching={this.props.events.loading}
        onRefresh={this._onRefresh}
      />
    );
  };

  // render
  renderContent = () => {
    const { events } = this.props;
    if (events.loading) {
      return <ActivityIndicator />;
    } else {
      switch (this.state.sorting) {
        case 'By time':
          events.data = _.orderBy(events.data, ['dateIndex'], ['asc']);
          console.log(events);
          return this.renderEvents(events);

        case 'Smallest first':
          events.data = _.orderBy(
            events.data,
            ['numberParticipantsIndex'],
            ['asc'],
          );
          return this.renderEvents(events);

        case 'Closest first':
          events.data = _.orderBy(events.data, ['locationSortIndex'], ['asc']);
          console.log(events);
          return this.renderEvents(events);
        default:
          events.data = _.orderBy(
            events.data,
            ['reccomendationIndex'],
            ['asc'],
          );
          console.log(events);
          return this.renderEvents(events);
      }
    }
  };

  changeSortOrder = () => {
    this.setState({ initialOrder: !this.state.initialOrder });
    console.log(this.state.initialOrder);
  };

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
        <EventsHeader headerText="Events" rightText={this.rightText()} />
        {this.renderContent()}
        <ActionButton
          buttonColor="#ff6e40"
          degrees={0}
          onPress={() => {
            this.props.openEventForm();
          }}
        >
          <Icon name="md-add" />
        </ActionButton>
      </View>
    );
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsView);
