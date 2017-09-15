import React from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

import { FlexRow } from './Layout';

export default class Person extends React.Component {
  render = () => (
    <View style={styles.topPart}>
      <View style={{ flex: 70 }}>
        <Text style={styles.topText}>{this.props.data.description}</Text>
      </View>

      <FlexRow style={styles.bottomPart}>
        <View style={styles.whiteCircle}>
          <Text style={styles.emoji}>{this.props.data.emoji}</Text>
        </View>
        {/* with flex:1 long username don't go exceed the bottom part  */}
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => {
            alert('does not work');
          }}
        >
          <Text>{this.props.data.username}</Text>
        </TouchableOpacity>
      </FlexRow>
    </View>
  );
}

const styles = StyleSheet.create({
  topPart: {
    height: 300,
    width: 200,
    marginLeft: 20,
    backgroundColor: '#939795',
  },
  topText: {
    color: 'white',
    marginTop: 5,
    marginLeft: 10,
    fontSize: 18,
    fontFamily: 'Avenir',
  },
  bottomPart: {
    width: 200,
    padding: 10,
    backgroundColor: '#E8E9E8',
    flex: 30,
    alignSelf: 'flex-end',
  },
  whiteCircle: {
    width: 50,
    height: 50,
    borderRadius: 100 / 2,
    backgroundColor: 'white',
    marginRight: 10,
  },
  emoji: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    fontSize: 30,
    paddingTop: 8,
  },
});
