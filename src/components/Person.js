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
    height: 300,
    width: 200,
    marginLeft: 20,
    backgroundColor: '#939795',
  },
  userName: {
    width: 200,
    padding: 5,
    backgroundColor: '#E8E9E8',
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
        <Text
          style={{
            color: 'white',
            marginTop: 5,
            marginLeft: 10,
            fontSize: 18,
            fontFamily: 'Avenir',
          }}
        >
          {this.props.data.description}
        </Text>
      </View>

      <FlexRow style={styles.userName}>
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 100 / 2,
            backgroundColor: 'white',
          }}
        >
          <Text
            style={{
              backgroundColor: 'transparent',
              alignSelf: 'center',
              fontSize: 30,
              paddingTop: 8,
            }}
          >
            {this.props.data.emoji}
          </Text>
        </View>

        <Text style={{ flex: 5 }}>{this.props.data.username}</Text>
      </FlexRow>
    </View>
  );
}
