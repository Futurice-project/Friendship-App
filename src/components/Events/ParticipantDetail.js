import React from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import styled from 'styled-components/native';

import TagCircle from './TagCircle';

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
  index,
}) => {
  const {
    emojiCircle,
    usernameContentStyle,
    usernameTextStyle,
    commonNaahsAndYeahs,
  } = styles;
  const commonYeahs = [];
  for (let i = 0; i < loveCommon; i++) {
    commonYeahs.push(<TagCircle key={i} />);
  }
  const commonNaahs = [];
  for (let i = 0; i < hateCommon; i++) {
    commonNaahs.push(<TagCircle key={i} dark />);
  }

  return (
    <ParticipantWrapper wrapperColor={index % 2 === 1 ? 1 : ''}>
      <View style={emojiCircle}>
        <Text style={styles.emoji}>{emoji ? emoji : '✌️'}</Text>
      </View>
      <View style={usernameContentStyle}>
        <Text style={usernameTextStyle}>{username}</Text>
        <View style={commonNaahsAndYeahs}>
          <View style={commonNaahsAndYeahs}>{commonYeahs}</View>
          <View style={commonNaahsAndYeahs}>{commonNaahs}</View>
        </View>
      </View>
    </ParticipantWrapper>
  );
};

const styles = StyleSheet.create({
  commonNaahsAndYeahs: {
    flexDirection: 'row',
  },
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
  usernameContentStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  usernameTextStyle: {
    fontSize: 18,
  },
});

export default ParticipantDetail;
