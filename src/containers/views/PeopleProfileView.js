import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import rest from '../../utils/rest';
import styled from 'styled-components/native';
import { NavigationActions } from 'react-navigation';

import Button from '../../components/Button';
import {
  Centered,
  DescriptionWrapper,
  HeaderButton,
  ViewContainerTop,
} from '../../components/Layout/Layout';
import { Description } from '../../components/Layout/TextLayout';
import TextInput from '../../components/TextInput';
import TabProfile from '../../components/Profile/TabProfile';
import PopUpMenu from '../../components/PopUpMenu';
import Personality from '../../components/SignUp/Personality';
import { ProfileTop } from '../../components/Profile/MyProfileTopPart';

const ButtonOption = styled.View`
  align-items: center;
  margin-top: 5px;
`;

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
  state = {
    loaded: false,
    age: '',
    description: '',
    isOptionsVisible: false,
    isReportVisible: false,
    reportDescription: '',
  };

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.personName,
  });

  componentWillReceiveProps(nextProps) {
    // render the profile user when we have the data.
    if (!nextProps.userDetails.loading && !nextProps.tagsForUser.loading) {
      this.setState({
        loaded: true,
      });
      this.getAge();
      this.getGenders();
    }
  }

  componentDidMount() {
    const personId = this.props.navigation.state.params.personId;
    this.props.refreshUser(personId);
    this.props.refreshTagsForUser(personId);
    this.props.refreshPersonalitiesForUser(personId);
  }

  getGenders = () => {
    const genders = this.props.userDetails.data.genderlist
      ? this.props.userDetails.data.genderlist
          .map(x => x && x.toLowerCase())
          .join(' and ')
      : '';
    this.setState({ genders: genders });
  };
  navigateBack = () => {
    const backAction = NavigationActions.back();
    this.props.navigation.dispatch(backAction);
  };

  getAge = () => {
    const birthYear = parseInt(this.props.userDetails.data.birthyear);
    const now = new Date();
    let age = now.getFullYear() - birthYear;
    // const m = now.getMonth() - birthDay.getMonth();
    // if (m < 0 || (m === 0 && now.getDate() < birthDay.getDate())) {
    //   age--;
    // }

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
  showReport = () => {
    const { isReportVisible } = this.state;
    this.setState({ isReportVisible: !isReportVisible });
  };
  sendReport = () => {
    const userId = this.props.userDetails.data.id;
    const description = this.state.reportDescription;
    const reported_by = this.props.auth.data.decoded.id;
    fetch(`http://localhost:3888/reports`, {
      method: 'post',
      headers: {
        Authorization: this.props.auth.data.token,
      },
      body: JSON.stringify({
        userId: userId,
        description: description,
        reported_by: reported_by,
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
        <ViewContainerTop style={styles.viewContent}>
          {/* <View style={styles.profileContainer}>
            <View style={styles.whiteCircle}>
              <Text style={styles.emoji}>
                {this.props.userDetails.data.emoji}
              </Text>
            </View>
            <Text style={styles.username}>
              {this.props.userDetails.data.username}
            </Text>
            <CompatibilityText>
              <YeahColor>
                {loveCommon}
                <FrienshipFont> YEAH</FrienshipFont>
              </YeahColor>{' '}
              &{' '}
              <NaahColor>
                {hateCommon}
                <FrienshipFont> NAAH</FrienshipFont>
              </NaahColor>{' '}
              in common{' '}
            </CompatibilityText>
            <Details>
              <LocationText>
                {this.props.userDetails.data.locations ? (
                  this.props.userDetails.data.locations.join(',')
                ) : (
                  'Narnia'
                )}
              </LocationText>
              {', ' + this.state.age + ', '}
              {this.state.genders}
            </Details>
          </View> */}
          <ProfileTop
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
              ) : (
                ''
              )
            }
            emoji={this.props.userDetails.data.emoji}
            numberOfYeah={loveCommon}
            numberOfNaah={hateCommon}
            navigateBack={this.navigateBack}
          />

          <DescriptionWrapper>
            <Description>{this.props.userDetails.data.description}</Description>
          </DescriptionWrapper>
          <View style={{ backgroundColor: '#faf5f0' }}>
            {this.renderPersonalities()}
          </View>
          <TabProfile hate={hate} love={love} />

          <Modal
            visible={this.state.isReportVisible}
            animationIn="slideInUp"
            animationInTiming={200}
          >
            <View
              style={{
                height: 200,
                backgroundColor: '#eee',
                borderRadius: 10,
                paddingVertical: 10,
              }}
            >
              <TextInput
                autoCorrect={false}
                autoCapitalize="none"
                titleColor="#2d4359"
                title={reportTitle}
                placeholder="Description"
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
                  onPress={this.showReport}
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
          </Modal>
          <HeaderButton>
            <PopUpMenu isReportVisible={this.showReport} />
          </HeaderButton>
        </ViewContainerTop>
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
