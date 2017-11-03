import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import { MenuContext } from 'react-native-popup-menu';
import Modal from 'react-native-modal';

import rest from '../../utils/rest';

import Button from '../../components/Button';
import {
  ViewContainer,
  ViewContainerTop,
  Centered,
  FlexRow,
} from '../../components/Layout';
import { SmallHeader, Description } from '../../components/Text';
import TextInput from '../../components/TextInput';
import TabProfile from '../../components/TabProfile';
import styled from 'styled-components/native';
import PopUpMenuUserProfile from '../../components/PopUpMenuUserProfile';

const ButtonOption = styled.View`
  align-items: center;
  marginTop: 5px;
`;

const mapStateToProps = state => ({
  auth: state.auth,
  userDetails: state.userDetails,
  tagsForUser: state.tagsForUser,
  currentUser: state.currentUser,
  tagsForCurrentUser: state.tagsForCurrentUser,
});

const mapDispatchToProps = dispatch => ({
  refreshUser: userId => dispatch(rest.actions.userDetails.get({ userId })),
  refreshTagsForUser: userId =>
    dispatch(rest.actions.tagsForUser.get({ userId })),
  reportUser: reportDetails => {
    dispatch(
      rest.actions.reports.post({}, { body: JSON.stringify(reportDetails) }),
    );
  },
});

class ProfileUser extends React.Component {
  state = {
    loaded: false,
    age: '',
    description: '',
    isOptionsVisible: false,
    isReportVisible: false,
    reportDescription: 'Description',
    //  loveCommon: 0,
    hateCommon: 0,
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
  // Modal functions
  showOptions = () => this.setState({ isOptionsVisible: true });
  hideOptions = () => this.setState({ isOptionsVisible: false });
  showReport = () => {
    this.setState({ isReportVisible: true });
  };
  hideReport = () => this.setState({ isReportVisible: false });
  sendReport = () => {
    const userId = this.props.userDetails.data.id;
    const description = this.state.reportDescription;
    const reported_by = this.props.auth.data.decoded.id;
    this.props.reportUser({ userId, description, reported_by });
    this.setState({ isReportVisible: false });
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
      let loveU = this.props.tagsForCurrentUser.data.filter(
        e => e.love === true,
      );
      let hateU = this.props.tagsForCurrentUser.data.filter(
        e => e.love === false,
      );
      let loveCommon = 0;
      let hateCommon = 0;

      loveU.filter(e =>
        love.filter(y => {
          if (e.name === y.name) {
            loveCommon++;
          }
        }),
      );
      hateU.filter(e =>
        hate.filter(y => {
          if (e.name === y.name) {
            hateCommon++;
          }
        }),
      );

      return (
        <ViewContainerTop style={styles.viewContent}>
          <TouchableOpacity
            onPress={this.showOptions}
            style={{ alignSelf: 'flex-end', marginRight: 15, marginTop: 32 }}
          >
            <Image
              source={require('../../../assets//icon_profile_overlay.png')}
            />
          </TouchableOpacity>
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
                ', Narnia'
              )}
            </Description>
            <Description>
              {loveCommon} YEAH & {hateCommon} NAAH in common{' '}
            </Description>
            <View
              style={{
                height: 100,
                borderWidth: 1,
                borderColor: '#fff',
                marginBottom: 10,
              }}
            >
              <Text> Personality Placeholder</Text>
            </View>
          </View>
          <TabProfile hate={hate} love={love} />
          <Modal isVisible={this.state.isOptionsVisible}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                onPress={this.hideOptions}
                style={{ alignSelf: 'flex-end' }}
              >
                <Image
                  source={require('../../../assets//icon_profile_overlay.png')}
                />
              </TouchableOpacity>

              <ButtonOption>
                <TouchableOpacity
                  onPress={this.showReport}
                  style={[styles.buttonStyle, { backgroundColor: '#faf5f0' }]}
                >
                  <Text style={[styles.textButtonStyle, { color: '#2a343c' }]}>
                    Report
                  </Text>
                </TouchableOpacity>
              </ButtonOption>

              <ButtonOption>
                <TouchableOpacity
                  onPress={this._onPressButton}
                  style={[styles.buttonStyle, { backgroundColor: '#faf5f0' }]}
                >
                  <Text style={[styles.textButtonStyle, { color: '#2a343c' }]}>
                    Manage Privacy
                  </Text>
                </TouchableOpacity>
              </ButtonOption>
            </View>
            <Modal visible={this.state.isReportVisible}>
              <ViewContainer style={{ flex: 1 }}>
                <View
                  style={{
                    height: 400,
                    backgroundColor: '#eee',
                    borderRadius: 5,
                    padding: 10,
                  }}
                >
                  <Text> Report {this.props.userDetails.data.username}</Text>
                  <TextInput
                    autoCorrect={false}
                    autoCapitalize="none"
                    titleColor="#2d4359"
                    title="REPORT USER"
                    placeholder="DETAILS OF REPORT"
                    backColor="#faf6f0"
                    onChangeText={reportDescription =>
                      this.setState({ reportDescription })}
                    value={this.state.reportDescription}
                  />
                  <View style={{ flexDirection: 'row' }}>
                    <Button
                      title="Cancel"
                      primary
                      textColor="green"
                      size="half"
                      color="light"
                      onPress={this.hideReport}
                    />
                    <Button
                      title="Report"
                      border
                      textColor="black"
                      size="half"
                      color="dark"
                      onPress={this.sendReport}
                    />
                  </View>
                </View>
              </ViewContainer>
            </Modal>
          </Modal>
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
