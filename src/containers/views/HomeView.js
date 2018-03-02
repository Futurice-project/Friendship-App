import React from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, FlatList, View, Text } from 'react-native';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export class HomeView extends React.Component {
  state = {};

  render() {
    return (
      <View>
        <Text>Home View </Text>
      </View>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
