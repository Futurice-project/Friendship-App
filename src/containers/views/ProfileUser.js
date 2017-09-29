import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { MenuContext } from 'react-native-popup-menu';
import rest from '../../utils/rest';

import { ViewContainerTop, Centered, FlexRow } from '../../components/Layout';
import { SmallHeader, Description } from '../../components/Text';
import TabProfile from '../../components/TabProfile';
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
      this.getAge();
    }
  }

    const early = [0, 1, 2, 3];
    const mid = [4, 5, 6];
    const late = [7, 8, 9];
    let ageName = '';
    const lastDigit = age.toString().substr(age.toString().length - 1);
    if (early.indexOf(parseInt(lastDigit)) > -1) {
      ageName = 'early ' + (age - parseInt(lastDigit)) + "'s";
    } else if (mid.indexOf(parseInt(lastDigit)) > -1) {
      ageName = 'mid ' + (age - parseInt(lastDigit)) + "'s";
    } else if (late.indexOf(parseInt(lastDigit)) > -1) {
      ageName = 'late ' + (age - parseInt(lastDigit)) + "'s";
    } else {
      ageName = "It's a mystery";
    }

    this.setState({ age: ageName });
  };

  setAge = () => {};
  componentDidMount() {
    const personId = this.props.navigation.state.params.personId;
    this.props.refreshUser(personId);
    this.props.refreshTagsForUser(personId);
  }

  getAge = () => {
    const birthDay = new Date(this.props.userDetails.data.birthday);
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
    this.setState({ age: ageName });
  };

  render = () => {
    if (!this.props.auth.data.decoded) {
      return (
        <View style={{ marginTop: 30 }}>
          <Text style={{ alignSelf: 'center' }}>You need to sign in!</Text>
        </View>
      );
    }
    if (!this.state.loaded) {
      return <ActivityIndicator />;
    } else {
      let love = this.props.tagsForUser.data.filter(e => e.love === true);
      let hate = this.props.tagsForUser.data.filter(e => e.love === false);
      return (
        <ViewContainerTop style={styles.viewContent}>
          <View style={styles.profileContainer}>
            <View style={styles.whiteCircle}>
              <Text style={styles.emoji}>
                {this.props.userDetails.data.emoji}
              </Text>
            </View>
            <Text style={styles.username}>
              {this.props.userDetails.data.username}
            </Text>
            <Description>
              {this.state.age}
              , male
              {this.props.userDetails.data.location ? (
                ', ' + this.props.userDetails.data.location
              ) : (
                ''
              )}
            </Description>
            <Description>I love ... and hate...</Description>
            <SmallHeader>LOOKING FOR</SmallHeader>
            <Description>
              The events you will actively look friends for will be visible here
            </Description>
          </View>
          <TabProfile hate={hate} love={love} />
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
  profileContainer: {
    alignItems: 'center',
    height: 300,
    marginTop: 23,
  },
  whiteCircle: {
    width: 64,
    height: 64,
    borderRadius: 64,
    backgroundColor: '#ffffff',
  },
  emoji: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    fontSize: 30,
    paddingTop: 8,
  },
  username: {
    height: 27,
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 2.44,
    textAlign: 'center',
    color: '#60686d',
    marginTop: 7,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileUser);
