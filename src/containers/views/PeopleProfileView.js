import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import { NavigationActions } from 'react-navigation';

import rest from '../../utils/rest';
import Button from '../../components/Button';
import {
  Centered,
  DescriptionWrapper,
  HeaderButton,
  ProfileContainer,
} from '../../components/Layout/Layout';
import { Description } from '../../components/Layout/TextLayout';
import TabProfile from '../../components/Profile/TabProfile';
import PopUpMenu from '../../components/PopUpMenu';
import Personality from '../../components/SignUp/Personality';
import ProfileTopPart from '../../components/Profile/ProfileTopPart';
import PeopleProfileReportModal from '../../components/Profile/PeopleProfileReportModal';

const mapStateToProps = state => ({
  auth: state.auth,
  userDetails: state.userDetails,
  tagsForUser: state.tagsForUser,
  personalitiesForUser: state.personalitiesForUser,
});

const mapDispatchToProps = dispatch => ({
  refreshUser: userId => dispatch(rest.actions.userDetails.get({ userId })),
  refreshTagsForUser: userId =>
    dispatch(rest.actions.tagsForUser.get({ userId })),
  refreshPersonalitiesForUser: userId =>
    dispatch(rest.actions.personalitiesForUser.get({ userId })),
});

class ProfileUser extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.personName,
  });

  state = {
    loaded: false,
    age: '',
    isReportVisible: false,
    reportDescription: '',
  };

  componentDidMount() {
    const personId = this.props.navigation.state.params.personId;
    this.props.refreshUser(personId);
    this.props.refreshTagsForUser(personId);
    this.props.refreshPersonalitiesForUser(personId);
  }

  componentWillReceiveProps(nextProps) {
    // render the profile user when we have the data.
    if (!nextProps.userDetails.loading && !nextProps.tagsForUser.loading) {
      this.setState({
        loaded: true,
      });
    }
  }

  _showModal = () => this.setState({ isModalVisible: true });

  _hideModal = () => this.setState({ isModalVisible: false });

  navigateBack = () => {
    const backAction = NavigationActions.back();
    this.props.navigation.dispatch(backAction);
  };

  // Modal functions
  showReport = () => {
    const { isReportVisible } = this.state;
    this.setState({ isReportVisible: !isReportVisible });
  };

  sendReport = () => {
    const userId = this.props.userDetails.data.id;
    const description = this.state.reportDescription;
    const reported_by = this.props.auth.data.decoded.id;
    fetch('http://localhost:3888/reports', {
      method: 'post',
      headers: {
        Authorization: this.props.auth.data.token,
      },
      body: JSON.stringify({
        userId,
        description,
        reported_by,
      }),
    });
    this.setState({ isReportVisible: false });
  };

  renderPersonalities() {
    var personalities = this.props.personalitiesForUser.data.map(
      personality => {
        return (
          <Personality
            key={personality.personalityId}
            title={personality.name}
            image={personality.name}
            profile={true}
          />
        );
      },
    );

    return (
      <Centered style={{ flexDirection: 'row', paddingVertical: 10 }}>
        {personalities.length > 0 ? (
          personalities
        ) : (
          <Text>No selected personalities</Text>
        )}
      </Centered>
    );
  }

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

      let loveCommon = this.props.userDetails.data.loveCommon
        ? this.props.userDetails.data.loveCommon
        : 0;
      let hateCommon = this.props.userDetails.data.hateCommon
        ? this.props.userDetails.data.hateCommon
        : 0;

      // if there is no picture for the user we use a default image
      const srcImage = this.props.userDetails.data.image
        ? {
            uri: 'data:image/png;base64,' + this.props.userDetails.data.image,
          }
        : require('../../../assets/img/placeholder/grone.jpg');

      let reportTitle = 'Report ' + this.props.userDetails.data.username;
      return (
        <ProfileContainer>
          <ProfileTopPart
            username={this.props.userDetails.data.username}
            srcImage={srcImage}
            location={
              this.props.userDetails.data.locations ? (
                this.props.userDetails.data.locations.join(',')
              ) : (
                'Narnia'
              )
            }
            age={this.state.age}
            genders={
              this.props.userDetails.data.genderlist ? (
                this.props.userDetails.data.genderlist.join(' and ')
              ) : null
            }
            emoji={this.props.userDetails.data.emoji}
            numberOfYeah={loveCommon}
            numberOfNaah={hateCommon}
            navigateBack={this.navigateBack}
            birthyear={this.props.userDetails.data.birthyear}
            genderList={this.props.userDetails.data.genderlist}
            showModal={this._showModal}
          />

          <DescriptionWrapper>
            <Description>{this.props.userDetails.data.description}</Description>
          </DescriptionWrapper>
          <View style={{ backgroundColor: '#faf5f0' }}>
            {this.renderPersonalities()}
          </View>
          <TabProfile hate={hate} love={love} />

          <PeopleProfileReportModal
            fn_reportDescription={reportDescription =>
              this.setState({ reportDescription })}
            reportDescription={this.state.reportDescription}
            reportTitle={reportTitle}
            isReportVisible={this.state.isReportVisible}
            showReport={this.showReport}
            sendReport={this.sendReport}
            hideModal={this._hideModal}
          />
          <PopUpMenu isReportVisible={this.showReport} />
        </ProfileContainer>
      );
    }
  };
}

const styles = StyleSheet.create({
  viewContent: {
    backgroundColor: '#e8e9e8',
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 23,
    backgroundColor: '#faf5f0',
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
  buttonStyle: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: 241,
    height: 47,
    borderRadius: 34,
    backgroundColor: 'red',
    marginTop: 20,
  },
  buttonTextStyle: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#faf6f0',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileUser);
