import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

const SpinnerView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Spinner = ({ size }) => (
  <SpinnerView>
    <ActivityIndicator size={size || 'large'} />
  </SpinnerView>
);

export default Spinner;
