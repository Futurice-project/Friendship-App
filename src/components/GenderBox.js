import React, { Component } from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

export default class GenderBox extends React.Component {
  state = { color: '#ffffff' };

  componentWillReceiveProps(newProps) {
    console.log('receiving props??');
    // this.setState({ color: newProps.color });
  }

  render() {
    return (
      <View style={{ backgroundColor: this.state.color }}>
        <TouchableOpacity onPress={this.props.updateGenders}>
          <Text>{this.props.gender}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const TouchableOpacity = styled.TouchableOpacity``;

const View = styled.View`
  overflow: hidden;
  height: 44;
  width: 36%;
  border-radius: 27;
  padding-left: 15;
  margin-right: 11;
  justify-content: center;
`;

const Text = styled.Text`
  font-family: 'NunitoSans-SemiBold';
  font-size: 18;
  color: #4a4a4a;
  text-align: left;
`;
