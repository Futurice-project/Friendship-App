import React from 'react';
import { NavigationActions } from 'react-navigation';
import Background from '../../../components/Background';
import ProfileCreatedMessage from '../../../components/ProfileCreatedMessage';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => ({
  openTabs: () =>
    dispatch(
      NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Tabs' })],
      }),
    ),
});

const ProfileCreatedScreen = props => (
  <Background>
    <ProfileCreatedMessage confirm={props.openTabs} />
  </Background>
);

export default connect(null, mapDispatchToProps)(ProfileCreatedScreen);
