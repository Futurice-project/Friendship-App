import styled from 'styled-components/native/index';

export const LabelText = styled.Text`
  font-family: 'NunitoSans-SemiBold';
  font-size: 18;
  color: #4a4a4a;
  text-align: left;
`;

export const HintWrapper = styled.View`width: 278;`;

export const Container = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Part = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 15;
  background-color: ${props =>
    props.backgroundStyle === 'light' ? '#f9f7f6' : '#efebe9'};
`;

export const FieldWrapper = styled.View`
  width: 278;
  border-bottom-width: 2;
  border-bottom-color: #979797;
`;

export const FieldContainer = styled.View`
  align-items: center;
  width: 100%;
  padding-top: 15;
  padding-bottom: 30;
`;

export const LabelTextHelper = styled.Text`
  font-family: 'NunitoSans-SemiBold';
  font-size: 14;
  color: #9b9b9b;
`;

export const Text = styled.Text``;
