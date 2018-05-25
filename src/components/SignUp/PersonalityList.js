import React from 'react';
import { Centered } from '../Layout/Layout';
import Personality from './Personality';
import styled from 'styled-components/native/index';

export default class TwoPersonalities extends React.Component {
  render() {
    return (
      <Centered>
        <Personality
          title={this.props.personality[0]}
          image={this.props.personality[0]}
          onPress={() => this.props.onPress(this.props.id[0], this.props.input)}
        />
        <PersonalityText>or</PersonalityText>
        <Personality
          title={this.props.personality[1]}
          image={this.props.personality[1]}
          onPress={() => this.props.onPress(this.props.id[1], this.props.input)}
        />
      </Centered>
    );
  }
}

const PersonalityText = styled.Text`
  margin-top: 15;
  margin-bottom: 15;
  font-size: 16;
  color: #efebe9;
  font-family: 'NunitoSans-Light';
`;
