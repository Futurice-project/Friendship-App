import React from 'react';
import { ActivityIndicator, Text, View, BackHandler } from 'react-native';
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
  chatrooms: state.chatRoomsWithUserId.data,
});

const mapDispatchToProps = dispatch => ({
  refreshUser: userId => dispatch(rest.actions.userDetails.get({ userId })),
  refreshTagsForUser: userId =>
    dispatch(rest.actions.tagsForUser.get({ userId })),
  refreshPersonalitiesForUser: userId =>
    dispatch(rest.actions.personalitiesForUser.get({ userId })),
  fetchUserChatrooms: userId =>
    dispatch(rest.actions.chatRoomsWithUserId.get({ userId })),
  openChatRequest: (user, previousRoute) =>
    dispatch(
      NavigationActions.navigate({
        routeName: 'ChatRequest',
        params: { user, route: previousRoute },
      }),
    ),
  openChatView: (existingChatRoomId, username, userEmoji, id, previousRoute) =>
    dispatch(
      NavigationActions.navigate({
        routeName: 'ChatView',
        params: {
          existingChatRoomId,
          username,
          userEmoji,
          id,
          previousRoute,
        },
      }),
    ),
});

class ProfileUser extends React.Component {
  state = {
    loaded: false,
    age: '',
  };

  componentWillMount() {
    this.fetchUserInfo();
    BackHandler.addEventListener('hardwareBackPress', this.backHandler);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backHandler);
  }

  backHandler = () => {
    this.navigateBack();
    return true;
  };

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
    this.props.fetchUserChatrooms(userId);
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
    if (!this.state.loaded) {
      return <ActivityIndicator />;
    }

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

    const location = this.props.userDetails.data.locations
      ? this.props.userDetails.data.locations.join(',')
      : 'Narnia';

    const genders = this.props.userDetails.data.genderlist
      ? this.props.userDetails.data.genderlist.join(' and ')
      : null;
    if (!userLoggedIn) {
      return this.renderNotLoggedIn();
    }

    let existingChatRoomId;
    // Load all existing chatrooms and check if one them has a matching users
    this.props.chatrooms.forEach(item => {
      if (
        item.creator.id === this.props.auth.data.decoded.id &&
        item.receiver.id === this.props.userDetails.data.id
      ) {
        existingChatRoomId = item.id;
      }
    });

    return (
      <ProfileContainer>
        <ProfileTopPart
          username={this.props.userDetails.data.username}
          srcImage={this.props.userDetails.data.image}
          location={location}
          age={this.state.age}
          genders={genders}
          avatar={this.props.userDetails.data.avatar}
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
        <TabProfile
          onChatRequest={() =>
            this.props.openChatRequest(this.props.userDetails.data, 'People')}
          openChatView={() =>
            this.props.openChatView(
              existingChatRoomId,
              this.props.userDetails.data.username,
              this.props.userDetails.data.avatar,
              this.props.userDetails.data.id,
              'People',
            )}
          hate={hate}
          love={love}
          existingChatRoom={existingChatRoomId}
        />
        <PopUpMenu
          isReportVisible={() =>
            this.props.navigation.navigate('Report', { data: Reportdata })}
        />
      </ProfileContainer>
    );
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileUser);
