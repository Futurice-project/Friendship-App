import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { MenuContext } from 'react-native-popup-menu';
import rest from '../../utils/rest';

import { tagsLove, tagsHate, profileData } from '../../Data/DummyProfile';
import { ViewContainerTop, Centered, FlexRow } from '../../components/Layout';
import { SmallHeader, Description } from '../../components/Text';
import TabProfile from '../../components/TabProfile';
import DetailsProfile from '../../components/DetailsProfile';
import PopUpMenuUserProfile from '../../components/PopUpMenuUserProfile';

const mapStateToProps = state => ({
  auth: state.auth,
  userDetails: state.userDetails,
  tagsForUser: state.tagsForUser,
});

const mapDispatchToProps = dispatch => ({
  refreshUser: userId => dispatch(rest.actions.userDetails.get({ userId })),
  refreshTagsForUser: userId =>
    dispatch(rest.actions.tagsForUser.get({ userId })),
});

class ProfileUser extends React.Component {
  state = {
    loaded: false,
    age: '',
    description: '',
    profileTitle: 'Profile Page',
  };

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.personName,
    headerRight: (
      <MenuContext>
        <PopUpMenuUserProfile />
      </MenuContext>
    ),
  });

  componentWillReceiveProps(nextProps) {
    // render the profile user when we have the data.
    if (!nextProps.userDetails.loading && !nextProps.tagsForUser.loading) {
      this.setState({
        loaded: true,
      });
      this.getAge(this.props.userDetails.data.birthday);
    }
  }

  componentDidMount() {
    const personId = this.props.navigation.state.params.personId;
    this.props.refreshUser(personId);
    this.props.refreshTagsForUser(personId);
  }

  getAge = birthday => {
    const birthDay = new Date(birthday);
    const now = new Date();
    let age = now.getFullYear() - birthDay.getFullYear();
    const m = now.getMonth() - birthDay.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < birthDay.getDate())) {
      age--;
    }

    const early = [0, 1, 2, 3];
    const mid = [4, 5, 6];
    const late = [7, 8, 9];
    let ageName = '';
    const lastDigit = age.toString().substr(age.toString().length - 1);
    if (age < 20) {
      ageName = age + ' years old';
    } else if (early.indexOf(parseInt(lastDigit)) > -1) {
      ageName = 'early ' + (age - parseInt(lastDigit)) + "'s";
    } else if (mid.indexOf(parseInt(lastDigit)) > -1) {
      ageName = 'mid ' + (age - parseInt(lastDigit)) + "'s";
    } else if (late.indexOf(parseInt(lastDigit)) > -1) {
      ageName = 'late ' + (age - parseInt(lastDigit)) + "'s";
    } else {
      ageName = "It's a mystery";
    }
    if (this.props.userDetails.data.birthday) {
      this.setState({ age: ageName });
    } else {
      return ageName;
    }
  };

  render = () => {
    if (!this.state.loaded) {
      return <ActivityIndicator />;
    } else {
      let loveTags = this.props.tagsForUser.data.filter(e => e.love === true);
      let hateTags = this.props.tagsForUser.data.filter(e => e.love === false);
      let dataProfile = this.props.userDetails.data;
      let age = this.state.age;

      // we use dummy data for the preview when user not logged in
      if (!this.props.auth.data.decoded) {
        loveTags = tagsLove[this.props.navigation.state.params.personId - 1];
        hateTags = tagsHate[this.props.navigation.state.params.personId - 1];
        dataProfile =
          profileData[this.props.navigation.state.params.personId - 1];
        age = this.getAge(dataProfile.birthday);
      }
      return (
        <ViewContainerTop style={styles.viewContent}>
          <DetailsProfile data={dataProfile} age={age} />
          <TabProfile hate={hateTags} love={loveTags} />
        </ViewContainerTop>
      );
    }
  };
}

const styles = StyleSheet.create({
  viewContent: {
    backgroundColor: '#e8e9e8',
    paddingVertical: 0,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileUser);
