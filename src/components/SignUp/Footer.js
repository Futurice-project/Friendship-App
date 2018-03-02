import React from 'react';
import { Part } from './Layout';
import RoundTab from '../RoundTab';
import styled from 'styled-components/native/index';

export default class Footer extends React.Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <Part style={{ paddingBottom: 0 }}>
        <RoundTabContainer>
          <RoundTab
            titleColor="white"
            tint="#2d4359"
            title="Next"
            style={{ flex: 1 }}
            onPress={() => handleSubmit}
          />
        </RoundTabContainer>
      </Part>
    );
  }
}

const RoundTabContainer = styled.View`margin-top: auto;`;
