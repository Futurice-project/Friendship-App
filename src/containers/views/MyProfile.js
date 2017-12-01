import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  Image,
  View,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import rest from '../../utils/rest';
import { Centered, DescriptionWrapper } from '../../components/Layout';
import { Description } from '../../components/Text';
import TabProfile from '../../components/TabProfile';
import RoundTab from '../../components/RoundTab';
import MyProfileModal from '../../components/Profile/MyProfileModal';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import Personality from '../../components/Personality';
import MyProfileTopPart from '../../components/Profile/MyProfileTopPart';
import waveShape from '../../../assets/img/roundTab/roundTab.png';
import resolveAssetSource from 'resolveAssetSource';
const { width, height } = resolveAssetSource(waveShape);

const mapStateToProps = state => ({
  auth: state.auth,
  currentUser: state.currentUser,
  tagsForCurrentUser: state.tagsForCurrentUser,
  currentUserGenders: state.currentUserGenders,
  personalitiesForUser: state.personalitiesForUser,
});

const mapDispatchToProps = dispatch => ({
  refreshUser: userId => dispatch(rest.actions.currentUser.get({ userId })),
  refreshTagsForUser: userId =>
    dispatch(rest.actions.tagsForCurrentUser.get({ userId })),
  refreshUserGenders: userId =>
    dispatch(rest.actions.currentUserGenders.get({ userId })),
  refreshPersonalitiesForUser: userId =>
    dispatch(rest.actions.personalitiesForUser.get({ userId })),
  signOut: () => {
    dispatch({ type: 'SIGN_OUT' });
  },
});

const ButtonOption = styled.View`
  align-items: center;
  margin-top: 5px;
`;

class MyProfile extends React.Component {
  state = {
    loaded: false,
    age: '',
    isModalVisible: false,
  };

  _showModal = () => this.setState({ isModalVisible: true });

  _hideModal = () => this.setState({ isModalVisible: false });

  static navigationOptions = ({ navigation }) => ({
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../../../assets/profile.png')}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    ),
  });

  componentWillReceiveProps(nextProps) {
    // render the profile user when we have the data.
    if (
      !nextProps.currentUser.loading &&
      !nextProps.tagsForCurrentUser.loading &&
      !nextProps.currentUserGenders.loading
    ) {
      this.setState({
        loaded: true,
      });
      this.getAge();
      this.getGenders();
    }
  }

  componentDidMount() {
    const personId = this.props.auth.data.decoded
      ? this.props.auth.data.decoded.id
      : null;
    this.props.refreshUser(personId);
    this.props.refreshTagsForUser(personId);
    this.props.refreshUserGenders(personId);
    this.props.refreshPersonalitiesForUser(personId);
  }

  getGenders = () => {
    const gendersArr = this.props.currentUserGenders.data.map(x => x.gender);
    const genders = gendersArr.join(' and ');
    this.setState({ genders: genders });
  };

  getAge = () => {
    const birthDay = new Date(this.props.currentUser.data.birthday);
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
      let love = this.props.tagsForCurrentUser.data.filter(e => {
        return e.love === true;
      });
      let hate = this.props.tagsForCurrentUser.data.filter(e => {
        return e.love === false;
      });

      // if there is no picture for the user we use a default image
      const srcImage = this.props.currentUser.data.image
        ? {
            uri: 'data:image/png;base64,' + this.props.currentUser.data.image,
          }
        : require('../../../assets/img/placeholder/grone.jpg');

      return (
        <ScrollView style={styles.viewContainer}>
          <MyProfileTopPart
            username={this.props.currentUser.data.username}
            srcImage={srcImage}
            location={this.props.currentUser.data.location}
            age={this.state.age}
            genders={this.state.genders}
            showModal={this._showModal}
            emoji={this.props.currentUser.data.emoji}
          />

          <DescriptionWrapper>
            <Description>
              {this.props.currentUser.data.description ? (
                this.props.currentUser.data.description
              ) : (
                'No description'
              )}
            </Description>
          </DescriptionWrapper>

          <View style={styles.personalitiesView}>
            {this.renderPersonalities()}
          </View>

          <TabProfile hate={hate} love={love} myprofile={true} />

          <MyProfileModal
            hideModal={this._hideModal}
            isModalVisible={this.state.isModalVisible}
            onPressButton={this._onPressButton}
            signOut={this.props.signOut}
          />
        </ScrollView>
      );
    }
  };
}
const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    paddingTop: 20,
  },
  personalitiesView: {
    backgroundColor: '#faf5f0',
  },
  icon: {
    width: 22,
    height: 20,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
