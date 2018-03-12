import styled from 'styled-components/native';
import React from 'react';
import {
  LayoutAnimation,
  Platform,
  TouchableWithoutFeedback,
  UIManager,
} from 'react-native';

export const ToggleSwitch = styled.View`
  width: 20;
  height: 20;
  background-color: ${props => (props.value ? '#ffffff' : '#3b3b3d')};
  border-radius: 40;
  left: ${props => (props.value ? 33 : 5)};
`;

export const ToggleRightText = styled.Text`
  font-family: 'NunitoSans-Regular';
  font-size: 13;
  font-weight: ${props => (props.value ? 'normal' : '900')};
  margin-top: 50;
  letter-spacing: 1.5;
  text-align: left;
  text-align: right;
  padding: 5px;
  color: ${props => props.tint || '#4a4a4a'};
  text-align-vertical: center;
`;
export const ToggleLeftText = styled.Text`
  font-family: 'NunitoSans-Regular';
  font-size: 13;
  font-weight: ${props => (props.value ? '900' : 'normal')};
  margin-top: 50;
  letter-spacing: 1.5;
  text-align: left;
  text-align: left;
  padding: 5px;
  color: ${props => props.tint || '#4a4a4a'};
  text-align-vertical: center;
`;
export const ContainerView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

export const ToggleView = styled.View`
  background-color: ${props => (props.value ? '#3b3b3d' : '#ffffff')};
  width: 58;
  height: 30;
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

var CustomLayoutAnimation = {
  duration: 300,
  create: {
    type: LayoutAnimation.Types.spring,
    property: LayoutAnimation.Properties.scaleXY,
    springDamping: 0.7,
  },
  update: {
    type: LayoutAnimation.Types.spring,
  },
};
/**
 * Styled Toggle component
 * @param {string} leftText - Sets the text on the left side
 * @param {string} rightText - Sets the text on the right side
 * @param {boolean} value - Sets the value of the switch
 * @param {function} onPress - Set the function of the toggle, should be changing the boolean value
 */
export default class Toggle extends React.Component {
  constructor() {
    super();
    //The following code must be set to use LayoutAnimation
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
  render = () => (
    <ContainerView style={{ marginBottom: 28 }}>
      <TextWrapper>
        <ToggleRightText value={this.props.value}>
          {this.props.leftText}
        </ToggleRightText>
      </TextWrapper>
      <TouchableWithoutFeedback
        style={{ flex: 1 }}
        onPress={() => {
          LayoutAnimation.configureNext(CustomLayoutAnimation);
          this.props.onPress();
        }}
      >
        <ToggleView value={this.props.value}>
          <ToggleSwitch value={this.props.value} />
        </ToggleView>
      </TouchableWithoutFeedback>
      <TextWrapper>
        <ToggleLeftText value={this.props.value}>
          {this.props.rightText}
        </ToggleLeftText>
      </TextWrapper>
    </ContainerView>
  );
}
