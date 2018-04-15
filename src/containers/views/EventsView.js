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
  eventParticipantsNum: state.eventParticipantsNum,
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
  fetchEventParticipantsNum: () =>
    dispatch(rest.actions.eventParticipantsNum.get()),
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
      sorting: 'Recommended',
    };
  }

  componentDidMount = () => {
    const userId = this.props.auth.data.decoded
      ? this.props.auth.data.decoded.id
      : null;
    this.props.fetchEvents(userId);
    this.props.fetchEventParticipantsNum();
  };

  rightText = () => {
    let data = [
      { value: 'Recommended' },
      { value: 'By time' },
      { value: 'Smallest first' },
      { value: 'Closest first' },
    ];
    return (
      <Dropdown
        dropdownMargins={{ min: 15, max: 20 }}
        dropdownOffset={{ top: 20, left: 15 }}
        dropdownPosition={0}
        pickerStyle={{ width: 150, marginTop: 12 }}
        containerStyle={{ marginBottom: 10, right: 10 }}
        data={data}
        value="Recommended"
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
    this.props.fetchEventParticipantsNum();
  };

  renderEvents = eventsOrder => {
    return (
      <EventsList
        events={eventsOrder}
        isFetching={
          this.props.events.loading || this.props.eventParticipantsNum.loading
        }
        onRefresh={this._onRefresh}
        eventParticipantsNum={this.props.eventParticipantsNum}
      />
    );
  };

  // render
  renderContent = () => {
    const { events, eventParticipantsNum } = this.props;
    if (events.loading || eventParticipantsNum.loading) {
      return <ActivityIndicator />;
    } else {
      switch (this.state.sorting) {
        case 'By time':
          //events.data = _.orderBy(events.data, ['dateIndex'], ['asc']);
          console.log(events);
          return this.renderEvents(events);

        case 'Smallest first':
          // events.data = _.orderBy(
          //   events.data,
          //   ['numberParticipantsIndex'],
          //   ['asc'],
          // );
          return this.renderEvents(events);

        case 'Closest first':
          // events.data = _.orderBy(events.data, ['locationSortIndex'], ['asc']);
          console.log(events);
          return this.renderEvents(events);
        default:
          // events.data = _.orderBy(
          //   events.data,
          //   ['reccomendationIndex'],
          //   ['asc'],
          // );
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
