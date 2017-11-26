import React, { Component } from 'react';
import { ActivityIndicator, View } from 'react-native';
import styled from 'styled-components/native';

export default class LoadingIndicator extends Component {
  render() {
    return (
      <LoadingView>
        <View></View>
        <ActivityIndicator color="darkblue" size="large" />
      </LoadingView>
    );
  }
}

const LoadingView = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: 0.5;
  backgroundColor: black;
  alignItems: center;
  justifyContent: space-around;
`;
