import { Centered } from '../Layout/Layout';
import React from 'react';
import styled from 'styled-components/native/index';

export default class YeahAndNaahList extends React.Component {
  render() {
    return (
      <Centered>
        <Activities>{this.props.list}</Activities>
      </Centered>
    );
  }
}

const Activities = styled.View`
  align-items: center;
  justify-content: center;
`;
