import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

const EventsHeader = ({ headerText, rightText }) => {
  return (
    <View style={[styles.viewStyle]}>
      <Text style={[styles.textStyle]}>{headerText}</Text>
      <View style={[styles.rightStyle]}>{rightText}</View>
    </View>
  );
};

export default EventsHeader;
