import React, { Component } from 'react';
import { ActivityIndicator, BackHandler, Text, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Dropdown } from 'react-native-material-dropdown';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';

import rest from '../../utils/rest';
import { connect } from 'react-redux';
import { IconImage } from '../../components/Layout/Layout';
import EventsHeader from '../../components/EventsHeader';
import EventsList from '../../components/Events/EventsList';
import Background from '../../components/Background';

const mapStateToProps = state => ({
  events: state.events,
  eventParticipantsNum: state.eventParticipantsNum,
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  fetchEvents: userId => dispatch(rest.actions.events.get({ userId })),
  openEventForm: setState => {
    dispatch(
      NavigationActions.navigate({
        routeName: 'EventCreateView',
      }),
    );
    setTimeout(() => {
      setState();
    }, 500);
  },

  fetchEventParticipantsNum: () =>
    dispatch(rest.actions.eventParticipantsNum.get()),
});

export class EventsView extends Component {
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
    this.touchableInactive = false;
  }

  componentDidMount = () => {
    const userId = this.props.auth.data.decoded
      ? this.props.auth.data.decoded.id
      : null;
    this.props.fetchEvents(userId);
    this.props.fetchEventParticipantsNum();

    BackHandler.addEventListener('hardwareBackPress', () => {
      this.navigateBack();
      return false;
    });
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
      <View>
        <Dropdown
          dropdownMargins={{ min: 15, max: 20 }}
          dropdownOffset={{ top: 20, left: 15 }}
          dropdownPosition={0}
          pickerStyle={{
            width: 'auto',
            marginTop: 12,
            height: 'auto',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          containerStyle={{ marginBottom: 10, right: 10 }}
          textColor={'#000000'}
          itemColor={'#000000'}
          itemCount={5}
          selectedItemColor={'#ff6e40'}
          baseColor={'#ff6e40'}
          data={data}
          value="Recommended"
          onChangeText={value => {
            this.setState({ sorting: value });
          }}
        />
      </View>
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
          let userEvents = events.data.filter(
            event => event.userIsJoining === true,
          );
          if (userEvents.length === 0) {
            return (
              <Text
                style={{ alignSelf: 'center', fontSize: 14, marginTop: 20 }}
              >
                You have no events
              </Text>
            );
          } else {
            // events.data = userEvents
            return this.renderEvents(userEvents);
          }

        case 'By time':
          events.data = _.orderBy(events.data, ['dateIndex'], ['desc']);
          return this.renderEvents(events.data);

        case 'Smallest first':
          events.data = _.orderBy(
            events.data,
            ['numberParticipantsIndex'],
            ['acs'],
          );
          return this.renderEvents(events.data);

        case 'Closest first':
          events.data = _.orderBy(events.data, ['locationSortIndex'], ['desc']);
          return this.renderEvents(events.data);
        default:
          events.data = _.orderBy(
            events.data,
            ['reccomendationIndex'],
            ['desc'],
          );
          return this.renderEvents(events.data);
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
      <Background color="grey">
        <EventsHeader headerText="Events" rightText={this.rightText()} />
        {this.renderContent()}
        <ActionButton
          buttonColor="#ff6e40"
          degrees={0}
          onPress={() => {
            if (!this.touchableInactive) {
              this.touchableInactive = true;
              this.props.openEventForm(() => (this.touchableInactive = false));
            }
          }}
        >
          <Icon name="md-add" />
        </ActionButton>
      </Background>
    );
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsView);
