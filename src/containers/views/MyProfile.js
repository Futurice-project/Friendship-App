import React from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Text, Image, View, StyleSheet } from 'react-native';
//import { IconImage } from '../../components/Layout';

export class MyProfile extends React.Component {
  static navigationOptions = {
    title: 'Profile',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../../../assets/profile.png')}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    ),
  };
  render = () => (
    <View>
      <Text>Welcome to Profile Page</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  icon: {
    width: 22,
    height: 20,
  },
});
export default connect(undefined)(MyProfile);
