import styled from 'styled-components/native';
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';

export const ToggleSwitch = styled.View`
  width: 20;
  height: 20;
  background-color: #3b3b3d;
  border-radius: 40;
  left: ${props => (props.value ? 5 : 72)};
`;

export const ToggleView = styled.View`
  background-color: #ffffff;
  width: 97;
  height: 50;
  border-width: 0.5;
  border-color: #e1e1e1;
  border-radius: 40;
  flex-direction: row;
`;
/**
 * Styled Toggle component
 * @param {boolean} value - Indicating the value of the switch
  * @param {function} onPress - Sets the function -->change the Toggle's state
 */
export default class Toggle extends React.Component {
  render = () => (
    <TouchableWithoutFeedback onPress={this.props.onPress}>
      <ToggleView>
        <ToggleSwitch value={this.props.value} />
      </ToggleView>
    </TouchableWithoutFeedback>
  );
}
