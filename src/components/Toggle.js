import styled from 'styled-components/native';
import React from 'react';
import { TouchableWithoutFeedback, Animated } from 'react-native';

state = { position: new Animated.Value(5) };

startAnimation = () => {
  const { position } = this.state;

  // Reset the value if needed
  position.setValue(5);

  // Start a spring animation
  Animated.spring(position, { toValue: 72, friction: 0.8 }).start();
};

export const ToggleSwitch = styled.View`
  width: 20;
  height: 20;
  background-color: #3b3b3d;
  border-radius: 40;
  left: ${props => (props.value ? 5 : startAnimation)};
`;

export const ToggleText = styled.Text`
  height: 50;

  font-family: 'NunitoSans-Regular';
  font-size: 13;
  letter-spacing: 1.59;
  text-align: ${props => (props.right ? 'right' : 'left')}};
  padding: 5px;
  color: #fff;
  text-align-vertical: center;
`;
export const ContainerView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

export const ToggleView = styled.View`
  background-color: #ffffff;
  width: 97;
  height: 50;
  border-width: 0.5;
  border-color: #e1e1e1;
  border-radius: 40;
  align-items: center;
  flex-direction: row;
`;

export const TextWrapper = styled.View`
  flex-wrap: nowrap;
  flex: 1;
`;
/**
 * Styled Toggle component
 * @param {boolean} value - Indicating the value of the switch
  * @param {function} onPress - Sets the function -->change the Toggle's state
	* @param {boolean} right - specify for the left text to align on the left side
	* @param {string} rightText - Sets the text of the right side of the switch
	* @param {string} leftText - Sets the text of the left side of the switch
 */
export default class Toggle extends React.Component {
  render = () => (
    <ContainerView>
      <TextWrapper>
        <ToggleText right>{this.props.leftText}</ToggleText>
      </TextWrapper>
      <TouchableWithoutFeedback
        style={{ flex: 1 }}
        onPress={this.props.onPress}
      >
        <ToggleView>
          <ToggleSwitch value={this.props.value} />
        </ToggleView>
      </TouchableWithoutFeedback>
      <TextWrapper>
        <ToggleText>{this.props.rightText}</ToggleText>
      </TextWrapper>
    </ContainerView>
  );
}
