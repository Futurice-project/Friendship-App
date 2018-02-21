import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

export default class SignUpEmoji extends React.Component {
  state = { selected: false };

  componentWillReceiveProps() {
    //const { emoji, selectedEmoji } = nextProps;
    console.log('..............................');
    if (this.props.emoji === this.props.selectedEmoji) {
      return this.setState({ selected: true });
    }
    return this.setState({ selected: false });
  }

  render() {
    //console.log(this.props.emoji);
    //console.log(this.props.selectedEmoji);
    //console.log(this.state.selected);
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
