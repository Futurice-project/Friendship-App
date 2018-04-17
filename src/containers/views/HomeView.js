import React from 'react';
import { connect } from 'react-redux';
import {
  ActivityIndicator,
  FlatList,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export class HomeView extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#ffffff',
        }}
      >
        <Text>Hello, this is the Home View </Text>
      </View>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
