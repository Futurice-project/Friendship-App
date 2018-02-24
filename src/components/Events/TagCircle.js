import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

export default class TagCircle extends Component {
  render() {
    let color = this.props.dark ? '#6eb1ea' : '#ff8a65';
    return <View style={[styles.circleStyle, { backgroundColor: color }]} />;
  }
}

const styles = StyleSheet.create({
  circleStyle: {
    width: 10,
    height: 10,
    borderRadius: 132 / 2,
    alignItems: 'center',
    marginRight: 2,
    marginTop: 12,
    justifyContent: 'flex-start',
  },
});
