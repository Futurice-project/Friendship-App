import React from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Text, Image, View, StyleSheet } from 'react-native';
import { IconImage } from '../../components/Layout';

export class InboxView extends React.Component {
  static navigationOptions = {
    title: 'Inbox',
    tabBarIcon: ({ tintColor }) => (
      <IconImage
        source={require('../../../assets/inbox.png')}
        tintColor={tintColor}
      />
    ),
  };
  render = () => (
    <View>
      <Text>Welcome to Inbox Page</Text>
    </View>
  );
}

export default connect(undefined)(InboxView);
