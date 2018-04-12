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
      sorting: '',
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

  renderContent = () => {
    const { events } = this.props;
    if (!this.state.initialOrder) {
      events.data.reverse();
    }
    if (!events.loading) {
      return (
        <EventsList
          events={events}
          isFetching={this.props.events.loading}
          onRefresh={this._onRefresh}
        />
      );
    }

    return <ActivityIndicator />;
  };
  // render

  changeSortOrder = () => {
    this.setState({ initialOrder: false });
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
        <TouchableOpacity
          onPress={() => this.changeSortOrder()}
          style={{ marginTop: 10, marginBottom: 10 }}
        />
        {this.renderContent()}
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={this.props.openEventForm}
          style={styles.TouchableOpacityStyle}
        >
          <Text style={{ fontSize: 30 }}>{'+'}</Text>
        </TouchableOpacity>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  TouchableOpacityStyle: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    right: 5,
    bottom: 15,
    borderStyle: 'solid',
    borderWidth: 2,
    backgroundColor: '#d8d8d8',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EventsView);
