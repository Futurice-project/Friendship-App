import React from 'react';
import { connect } from 'react-redux';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NavigationActions } from 'react-navigation';

import rest from '../../utils/rest';
import {
  Centered,
  DescriptionWrapper,
  ProfileContainer,
} from '../../components/Layout/Layout';
import { Description } from '../../components/Layout/TextLayout';
import TabProfile from '../../components/Profile/TabProfile';
import MyProfileModal from '../../components/Profile/MyProfileModal';
import Personality from '../../components/SignUp/Personality';
import ProfileTopPart from '../../components/Profile/ProfileTopPart';

const mapStateToProps = state => ({
  auth: state.auth,
  currentUser: state.currentUser,
  tagsForCurrentUser: state.tagsForCurrentUser,
  personalitiesForCurrentUser: state.personalitiesForCurrentUser,
});

const mapDispatchToProps = dispatch => ({
  refreshUser: userId => dispatch(rest.actions.currentUser.get({ userId })),
  refreshTagsForUser: userId =>
    dispatch(rest.actions.tagsForCurrentUser.get({ userId })),
  refreshPersonalitiesForUser: userId =>
    dispatch(rest.actions.personalitiesForCurrentUser.get({ userId })),
  signOut: () => {
    dispatch({ type: 'SIGN_OUT' });
  },
});

class MyProfile extends React.Component {
  static navigationOptions = () => ({
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../../../assets/profile.png')}
        style={[styles.icon, { tintColor }]}
      />
    ),
  });

  state = {
    loaded: false,
    age: '',
    isModalVisible: false,
  };

  componentDidMount() {
    const personId = this.props.auth.data.decoded
      ? this.props.auth.data.decoded.id
      : null;
    this.props.refreshUser(personId);
    this.props.refreshTagsForUser(personId);
    this.props.refreshPersonalitiesForUser(personId);
  }

  componentWillReceiveProps(nextProps) {
    // render the profile user when we have the data.
    if (
      !nextProps.currentUser.loading &&
      !nextProps.tagsForCurrentUser.loading &&
      !nextProps.personalitiesForCurrentUser.loading
    ) {
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

  renderPersonalities() {
    var personalities = this.props.personalitiesForCurrentUser.data.map(
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
        <ProfileContainer>
          <ProfileTopPart
            username={this.props.currentUser.data.username}
            srcImage={srcImage}
            location={
              this.props.currentUser.data.locations ? (
                this.props.currentUser.data.locations.join(',')
              ) : (
                'Narnia'
              )
            }
            age={this.state.age}
            genders={
              this.props.currentUser.data.genderlist ? (
                this.props.currentUser.data.genderlist.join(' and ')
              ) : (
                ''
              )
            }
            showModal={this._showModal}
            emoji={this.props.currentUser.data.emoji}
            numberOfYeah={love.length}
            numberOfNaah={hate.length}
            navigateBack={this.navigateBack}
            myProfile
            birthyear={this.props.currentUser.data.birthyear}
            genderList={this.props.currentUser.data.genderlist}
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
        </ProfileContainer>
      );
    }
  };
}
const styles = StyleSheet.create({
  personalitiesView: {
    backgroundColor: '#faf5f0',
  },
  icon: {
    width: 22,
    height: 20,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
