import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';

import ParticipantDetail from './ParticipantDetail';

const ParticipantList = ({ participants, currentUser, hostId }) => {
  const renderItem = ({ item, index }) => (
    <ParticipantDetail
      id={item.id}
      username={item.username}
      emoji={item.emoji}
      hateCommon={item.hateCommon}
      loveCommon={item.loveCommon}
      index={index}
      currentUser={currentUser}
      isHost={item.id === hostId}
    />
  );

  const keyExtractor = participant => `participant-${participant.id}`;

  return (
    <View>
      <Text style={styles.groupTextStyle}>GROUP PARTICIPANTS</Text>
      <FlatList
        data={participants.data[0].rows}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  groupTextStyle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#4a4a4a',
    marginLeft: 15,
    marginBottom: 10,
  },
});

export default ParticipantList;
