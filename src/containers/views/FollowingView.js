import React from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import { ViewContainerTop } from '../../components/Layout/Layout';

export class FollowingView extends React.Component {
  render = () => (
    <ViewContainerTop>
      <Text>Welcome to Following Pages</Text>
    </ViewContainerTop>
  );
}
export default connect(undefined)(FollowingView);
