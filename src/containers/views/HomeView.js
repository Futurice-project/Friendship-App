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
  state = {};

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#ffffff',
        }}
      >
        <Text>Home View </Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Feedback')}
        >
          <Text>Feedback goes from here!</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
