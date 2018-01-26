import React from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import { IconImage, ViewContainerTop } from '../../components/Layout/Layout';

export class FollowingView extends React.Component {
  static navigationOptions = {
    title: 'Following',
    tabBarIcon: ({ tintColor }) => (
      <IconImage
        source={require('../../../assets/following.png')}
        tintColor={tintColor}
      />
    ),
  };
  render = () => (
    <ViewContainerTop>
      <Text>Welcome to Following Pages</Text>
    </ViewContainerTop>
  );
}
export default connect(undefined)(FollowingView);
