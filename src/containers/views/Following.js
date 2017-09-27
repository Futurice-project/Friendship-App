import React from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Text, Image, View, StyleSheet } from 'react-native';
import { IconImage } from '../../components/Layout';

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
    <View>
      <Text>Welcome to Following Pagesssssss</Text>
    </View>
  );
}
export default connect(undefined)(FollowingView);
