import React, { Component } from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

export default class GenderBox extends React.Component {
  state = { selected: false };

  componentWillReceiveProps(nextProps) {
    const { emoji, selectedEmoji, updateEmoji } = nextProps;
    if (emoji === selectedEmoji) {
      return this.setState({ selected: true });
    }
    return this.setState({ selected: false });
  }

  render() {
    return (
      <TouchableOpacity onPress={() => this.props.updateEmoji()}>
        <MoodContainer
          style={{
            backgroundColor: this.state.selected ? '#ff8a65' : '#ffffff',
          }}
        >
          <Emoji>{this.props.emoji}</Emoji>
        </MoodContainer>
      </TouchableOpacity>
    );
  }
}

const MoodContainer = styled.View`
  height: 70;
  width: 70;
  background-color: #ffffff;
  border-radius: 35;
  justify-content: center;
  align-items: center;
  margin-right: 12;
`;

const Emoji = styled.Text`font-size: 30;`;
