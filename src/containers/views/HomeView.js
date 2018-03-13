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
      <View>
        <Text>Home View </Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Report')}
        >
          <Text>Report</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
