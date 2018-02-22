import React from 'react';
import { Text, View, Image, Linking, StyleSheet, Platform } from 'react-native';
import styled from 'styled-components/native';

import Card from './Card';
import CardSection from './CardSection';

const ParticipantWrapper = styled.View`
  width: 100%;
  height: 90;
  background-color: ${props => {
    switch (props.wrapperColor) {
      case 1:
        return '#ffffff';
      default:
        return '#f9f7f6';
    }
  }};
  display: flex;
  flex-direction: row;
`;

const ParticipantDetail = ({
  username,
  emoji,
  hateCommon,
  loveCommon,
  id,
  index,
}) => {
  const image = require('../../../assets/img/placeholder/grone.jpg');
  const {
    emojiCircle,
    headerContentStyle,
    headerTextStyle,
    imageStyle,
  } = styles;

  return (
    <ParticipantWrapper wrapperColor={index % 2 === 1 ? 1 : ''}>
      <View style={emojiCircle}>
        <Text style={styles.emoji}>{emoji ? emoji : '✌️'}</Text>
      </View>
      <View style={headerContentStyle}>
        <Text style={headerTextStyle}>{username}</Text>
        <Text>{`${loveCommon} Yeahs and ${hateCommon} Naahs`}</Text>
      </View>
    </ParticipantWrapper>
  );
};

const styles = StyleSheet.create({
  emojiCircle: {
    width: 66,
    height: 66,
    borderRadius: 132 / 2,
    backgroundColor: 'white',
    alignItems: 'center',
    marginLeft: 17,
    marginRight: 15,
    marginTop: 12,
    justifyContent: 'flex-start',
  },
  emoji: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    fontSize: Platform.OS === 'android' ? 30 : 40,
    paddingTop: 8,
  },
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  headerTextStyle: {
    fontSize: 18,
  },
});

export default ParticipantDetail;
