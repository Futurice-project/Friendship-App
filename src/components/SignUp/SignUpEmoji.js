import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

export default class SignUpEmoji extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.updateEmoji(this.props.emoji)}
      >
        <MoodContainer
          style={{
            backgroundColor: this.props.selected ? '#ff8a65' : '#ffffff',
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
