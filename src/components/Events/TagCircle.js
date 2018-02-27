import React from 'react';
import { View, StyleSheet } from 'react-native';

const TagCircle = ({ dark }) => {
  let color = dark ? '#6eb1ea' : '#ff8a65';
  return <View style={[styles.circleStyle, { backgroundColor: color }]} />;
};

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

export default TagCircle;
