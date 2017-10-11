import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

const SpinnerView = styled.View`
  ${props => (props.fullflex ? 'flex: 100' : 'flex: 1')};
  justify-content: center;
  align-items: center;
`;

const Spinner = ({ size, fullflex }) => (
  <SpinnerView fullflex={fullflex}>
    <ActivityIndicator size={size || 'large'} />
  </SpinnerView>
);

export default Spinner;
