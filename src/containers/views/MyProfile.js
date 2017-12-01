import React from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import {
  Text,
  Image,
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
//import { IconImage } from '../../components/Layout';
import rest from '../../utils/rest';
import {
  ViewContainerTop,
  Centered,
  DescriptionWrapper,
  FlexRow,
} from '../../components/Layout';
import { Description, Details, LocationText } from '../../components/Text';
import TabProfile from '../../components/TabProfile';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import Personality from '../../components/Personality';

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

    profileTitle: 'Profile Page',
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
        {personalities}
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
      return (
        <ViewContainerTop style={styles.viewContent}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Image
              style={{ width: 400, height: 200 }}
              source={{
                uri:
                  'data:image/png;base64,' + this.props.currentUser.data.image,
              }}
            >
              <TouchableOpacity
                onPress={this._showModal}
                style={{
                  alignSelf: 'flex-end',
                  marginRight: 37,
                  marginTop: 33,
                }}
              >
                <Image
                  source={require('../../../assets//icon_profile_overlay.png')}
                />
              </TouchableOpacity>
              <View style={styles.whiteCircle}>
                <Text style={styles.emoji}>
                  {this.props.currentUser.data.emoji}
                </Text>
              </View>
            </Image>
          </View>
          <View style={styles.profileContainer}>
            <Text style={styles.username}>
              {this.props.currentUser.data.username}
            </Text>
            <Details>
              <LocationText>
                {this.props.currentUser.data.location ? (
                  this.props.currentUser.data.location
                ) : (
                  'Narnia'
                )}
              </LocationText>
              {', ' + this.state.age + ', '}
              {this.state.genders}
            </Details>
            <DescriptionWrapper>
              <Description>
                {this.props.currentUser.data.description}
              </Description>
            </DescriptionWrapper>
            <View style={{ backgroundColor: '#faf5f0' }}>
              {this.renderPersonalities()}
            </View>
          </View>

          <TabProfile hate={hate} love={love} myprofile={true} />

          <Modal
            backdropColor="#2a343c"
            backdropOpacity={0.96}
            isVisible={this.state.isModalVisible}
          >
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                onPress={this._hideModal}
                style={{ alignSelf: 'flex-end' }}
              >
                <Image
                  source={require('../../../assets//icon_profile_overlay.png')}
                />
              </TouchableOpacity>

              <ButtonOption>
                <TouchableOpacity
                  onPress={this._onPressButton}
                  style={styles.buttonStyle}
                >
                  <Text style={styles.buttonTextStyle}>Privacy Settings</Text>
                </TouchableOpacity>
              </ButtonOption>

              <ButtonOption>
                <TouchableOpacity
                  onPress={this._onPressButton}
                  style={styles.buttonStyle}
                >
                  <Text style={styles.buttonTextStyle}>Send Feedback</Text>
                </TouchableOpacity>
              </ButtonOption>

              <ButtonOption>
                <TouchableOpacity
                  onPress={() => this.props.signOut()}
                  style={styles.buttonStyle}
                >
                  <Text
                    style={[
                      styles.buttonTextStyle,
                      { fontFamily: 'NunitoSans-Bold' },
                    ]}
                  >
                    Log Out
                  </Text>
                </TouchableOpacity>
              </ButtonOption>
            </View>
          </Modal>
        </ViewContainerTop>
      );
    }
  };
}
const styles = StyleSheet.create({
  icon: {
    width: 22,
    height: 20,
  },
  viewContent: {
    backgroundColor: '#e8e9e8',
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 23,
    backgroundColor: '#faf5f0',
  },
  whiteCircle: {
    alignContent: 'flex-end',
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    marginTop: 25,
    marginRight: 40,
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
    // width: 241,
    // height: 47,
    // borderRadius: 34,
    // backgroundColor: 'red',
    marginTop: 20,
  },
  buttonTextStyle: {
    fontFamily: 'NunitoSans-Regular',
    alignSelf: 'center',
    fontSize: 20,
    color: '#faf6f0',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
