/**
 * TODOs: Go to the EventDetail and make some changes: When user click on Join Now, change userIsJoining to true
 */
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
      { value: 'My Events' },
      { value: 'By time' },
      { value: 'Smallest first' },
      { value: 'Closest first' },
    ];
    return (
      <Dropdown
        dropdownMargins={{ min: 15, max: 20 }}
        dropdownOffset={{ top: 20, left: 15 }}
        dropdownPosition={0}
        pickerStyle={{
          width: 150,
          marginTop: 12,
          height: 'auto',
        }}
        containerStyle={{ marginBottom: 10, right: 10 }}
        textColor={'#000000'}
        itemColor={'#000000'}
        selectedItemColor={'#ff6e40'}
        baseColor={'#ff6e40'}
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
    } else if (events.data.id || events.data.data) {
      return <ActivityIndicator />;
    } else {
      switch (this.state.sorting) {
        case 'My Events':
          console.log(events.data);
          let userEvents = _.find(events.data, ['userIsJoining', true]);
          console.log(userEvents);
          if (!userEvents) {
            return (
              <Text
                style={{ alignSelf: 'center', fontSize: 14, marginTop: 20 }}
              >
                You have no events
              </Text>
            );
          } else {
            // events.data = userEvents;
            return this.renderEvents(userEvents);
          }

        case 'By time':
          events.data = _.orderBy(events.data, ['dateIndex'], ['desc']);
          return this.renderEvents(events);

        case 'Smallest first':
          events.data = _.orderBy(
            events.data,
            ['numberParticipantsIndex'],
            ['acs'],
          );
          return this.renderEvents(events);

        case 'Closest first':
          events.data = _.orderBy(events.data, ['locationSortIndex'], ['desc']);
          //console.log(events);
          return this.renderEvents(events);
        default:
          events.data = _.orderBy(
            events.data,
            ['reccomendationIndex'],
            ['desc'],
          );
          return this.renderEvents(events);
      }
    }
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
