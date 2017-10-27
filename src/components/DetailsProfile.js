import React, { PureComponent } from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SmallHeader, Description } from './Text';

import { ViewContainerTop, Centered, FlexRow } from './Layout';

export default class DetailsProfile extends PureComponent {
  render = () => {
    dataProfile = this.props.data;
    age = this.props.age;
    return (
      <View style={styles.profileContainer}>
        <View style={styles.whiteCircle}>
          <Text style={styles.emoji}>{dataProfile.emoji}</Text>
        </View>
        <Text style={styles.username}>{dataProfile.username}</Text>
        <Description>
          {age}
          , male
          {dataProfile.location ? ', ' + dataProfile.location : ''}
        </Description>
        <Description>I love ... and hate...</Description>
        <SmallHeader>LOOKING FOR</SmallHeader>
        <Description>
          The events you will actively look friends for will be visible here
        </Description>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  viewContent: {
    backgroundColor: '#e8e9e8',
    paddingVertical: 0,
  },
  profileContainer: {
    alignItems: 'center',
    height: 300,
    marginTop: 23,
  },
  whiteCircle: {
    width: 64,
    height: 64,
    borderRadius: 64,
    backgroundColor: '#ffffff',
  },
  emoji: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    fontSize: 30,
    paddingTop: 8,
  },
  username: {
    height: 27,
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 2.44,
    textAlign: 'center',
    color: '#60686d',
    marginTop: 7,
  },
});
