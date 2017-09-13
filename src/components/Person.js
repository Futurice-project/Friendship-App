import React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import styled from 'styled-components/native';

import { FlexRow } from './Layout';

// const ProfileMini = styled.div`
//                     height: 250px;
//                     width: 200px;
//                     border-style: solid;
//                     border-width: 1px;
//                     margin-left: 20px;
//                     `;

const styles = StyleSheet.create({
  main: {
    height: 250,
    width: 200,
    borderStyle: 'solid',
    borderWidth: 1,
    marginLeft: 20,
    backgroundColor: 'red',
  },
  userName: {
    width: 199,
    padding: 5,
    backgroundColor: '#faf',
    flex: 2,
    alignSelf: 'flex-end',
  },
});

export default class Person extends React.Component {
  render = () => (
    <View
      style={
        styles.main
        // { height: 250, width: 200, borderStyle: "solid", borderWidth: 1, marginLeft: 20, padding: 5, backgroundColor: this.props.color}
      }
    >
      <View style={{ flex: 4 }}>
        <Text>{this.props.data.description}</Text>
      </View>

      <FlexRow style={styles.userName}>
        <Text
          style={{ flex: 1, width: 20, height: 20, backgroundColor: 'white' }}
        >
          {this.props.data.emoji}
        </Text>
        <Text style={{ flex: 5 }}>{this.props.data.username}</Text>
      </FlexRow>
    </View>
  );
}
