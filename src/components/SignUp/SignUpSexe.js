import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native/index';
import GenderBox from './GenderBox';

export default class SignUpSexe extends React.Component {
  render() {
    return (
      <View>
        <GenderBoxContainer style={{ height: 44 }}>
          <GenderBox
            updateGenders={() => this.updateGenders(1)}
            gender="WOMAN"
          />
          <GenderBox updateGenders={() => this.updateGenders(2)} gender="MAN" />
        </GenderBoxContainer>
        <GenderBoxContainer style={{ height: 44 }}>
          <GenderBox
            updateGenders={() => this.updateGenders(3)}
            gender="HUMAN"
          />
          <GenderBox
            updateGenders={() => this.updateGenders(4)}
            gender="OTHER"
          />
        </GenderBoxContainer>
      </View>
    );
  }
}

const GenderBoxContainer = styled.View`
  height: 44;
  width: 100%;
  margin-left: 26%;
  flex-direction: row;
  margin-top: 12;
`;
