import React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';

export default class TextRectangle extends React.Component {
  render = () => (
    <View style={this.props.style}>
      <View style={styles.recContent}>
        <Text style={styles.recText}>{this.props.Text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  recContent: {
    height: 61,
    marginTop: 'auto',
  },
  recText: {
    fontSize: 30,
    fontWeight: '600',
    lineHeight: 34,
    textAlign: 'center',
    color: '#0000ff',
  },
});
