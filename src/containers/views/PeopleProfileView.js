import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import {
  Centered,
  DescriptionWrapper,
  ProfileContainer,
} from '../../components/Layout/Layout';
import { Description } from '../../components/Layout/TextLayout';
import rest from '../../utils/rest';
import TabProfile from '../../components/Profile/TabProfile';
import PopUpMenu from '../../components/PopUpMenu';
import Personality from '../../components/SignUp/Personality';
import ProfileTopPart from '../../components/Profile/ProfileTopPart';

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
  };

  componentDidMount() {
    this.fetchUserInfo();
  }

  componentWillReceiveProps(nextProps) {
    // render the profile user when we have the data.
    if (!nextProps.userDetails.loading && !nextProps.tagsForUser.loading) {
      this.setState({
        loaded: true,
      });
    }
  }

  fetchUserInfo = () => {
    const userId = this.props.navigation.state.params.personId;
    this.props.refreshUser(userId);
    this.props.refreshTagsForUser(userId);
    this.props.refreshPersonalitiesForUser(userId);
  };

  navigateBack = () => {
    const backAction = NavigationActions.back();
    this.props.navigation.dispatch(backAction);
  };

  renderPersonalities() {
    const personalities = this.props.personalitiesForUser.data.map(
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

  renderUserDescription = () => {
    const description = this.props.userDetails.data.description
      ? this.props.userDetails.data.description
      : ' No description';

    return description;
  };

  renderNotLoggedIn = () => {
    return (
      <View style={{ marginTop: 30 }}>
        <Text style={{ alignSelf: 'center' }}>You need to sign in!</Text>
      </View>
    );
  };

  render = () => {
    const userLoggedIn = this.props.auth.data.decoded;
    const Reportdata = {
      id: this.props.userDetails.data.id,
      currentUser: this.props.auth.data.decoded.id,
      auth: this.props.auth.data.token,
    };

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

    const location = this.props.userDetails.data.locations
      ? this.props.userDetails.data.locations.join(',')
      : 'Narnia';

    const genders = this.props.userDetails.data.genderlist
      ? this.props.userDetails.data.genderlist.join(' and ')
      : null;

    if (!userLoggedIn) {
      return this.renderNotLoggedIn();
    }

    if (!this.state.loaded) {
      return <ActivityIndicator />;
    }

    return (
      <ProfileContainer>
        <ProfileTopPart
          username={this.props.userDetails.data.username}
          srcImage={srcImage}
          location={location}
          age={this.state.age}
          genders={genders}
          emoji={this.props.userDetails.data.emoji}
          numberOfYeah={loveCommon}
          numberOfNaah={hateCommon}
          navigateBack={this.navigateBack}
          birthyear={this.props.userDetails.data.birthyear}
          genderList={this.props.userDetails.data.genderlist}
        />

        <DescriptionWrapper>
          <Description>{this.renderUserDescription()}</Description>
        </DescriptionWrapper>
        <View style={{ backgroundColor: '#faf5f0' }}>
          {this.renderPersonalities()}
        </View>
        <TabProfile hate={hate} love={love} />
        <PopUpMenu
          isReportVisible={() =>
            this.props.navigation.navigate('Report', { data: Reportdata })}
        />
      </ProfileContainer>
    );
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileUser);
