import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { paddings } from '../../styles';
import { ActivityIndicator, FlatList, View } from 'react-native';
import RoundTab from '../RoundTab';
import { Centered } from '../Layout/Layout';
import Person from '../Person';
import rest from '../../utils/rest';
import { connect } from 'react-redux';
import styles from './styles';

const mapStateToProps = state => ({
  people: state.usersByPage,
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  fetchUsersByPage: number => {
    dispatch(rest.actions.usersByPage({ number }));
  },
});

class PeopleList extends Component {
  state = {
    userData: [],
    currentPage: 0,
  };

  componentWillMount() {
    this.fetchUsersForPage(this.state.currentPage);
  }

  componentWillReceiveProps(nextProps) {
    this.setStateWithUsersData(nextProps);
  }

  setStateWithUsersData = nextProps => {
    if (
      nextProps.people.sync &&
      !nextProps.people.loading &&
      nextProps.people.data !== this.props.people.data
    ) {
      this.setState({
        userData: [...this.state.userData, ...nextProps.people.data],
      });
    }
  };

  // fetch 10 users and add them to the state.data
  fetchUsersForPage = currentPage => {
    this.props.fetchUsersByPage(currentPage);
    this.setState({ currentPage: this.state.currentPage + 1 });
  };

  //this variable prevent handleEnd() to be called during the first render (know RN bug)
  onEndReachedCalledDuringMomentum = true;

  handleEnd = () => {
    if (!this.onEndReachedCalledDuringMomentum) {
      // fetch 10 more users from the db
      this.fetchUsersForPage(this.state.currentPage);
      this.onEndReachedCalledDuringMomentum = true;
    }
  };

  render() {
    const { userData } = this.state;
    const { people } = this.props;

    if (people.syncing && people.loading && !userData) {
      return <ActivityIndicator />;
    }

    return (
      <View style={[styles.peopleList]}>
        <RoundTab tint="#ffffff" title="PEOPLE" />
        <View style={[styles.people]}>
          <FlatList
            data={userData}
            keyExtractor={(item, index) => 'list-item-' + index}
            renderItem={({ item }) => <Person box data={item} />}
            onEndReached={this.handleEnd}
            onEndReachedThreshold={0.4}
            onMomentumScrollBegin={() => {
              this.onEndReachedCalledDuringMomentum = false;
            }}
            horizontal
            style={[styles.list]}
          />
        </View>
      </View>
    );
  }
}

PeopleList.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(PeopleList);
