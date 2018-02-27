import styled from 'styled-components/native';

export const Text = styled.Text`color: #4b5c5d;`;
export const Bold = Text.extend`font-weight: bold;`;

export const CenteredText = Bold.extend`text-align: center;`;

export const Description = styled.Text`
  font-family: 'NunitoSans-Light';
  font-size: 12px;
  line-height: 18;
  letter-spacing: 0.4;
  font-weight: 300;
  text-align: center;
  color: #4a4a4a;
`;

export const BoldDescription = styled.Text`
  font-family: 'NunitoSans-Bold';
  font-size: 18px;
  line-height: 24;
  letter-spacing: 0.4;
  text-align: center;
  color: #fff;
`;

export const Details = styled.Text`
  font-family: 'NunitoSans-Regular';
  font-size: 16px;
  line-height: 24;
  font-weight: 300;
  text-align: center;
  color: #4a4a4a;
  margin-bottom: 12px;
  background-color: transparent;
`;

export const CompatibilityText = styled.Text`
  font-family: 'NunitoSans-Light';
  font-size: 14px;
  ${'' /* line-height: 24; */} font-weight: 300;
  color: #4a4a4a;
  margin-bottom: 14px;
  letter-spacing: 0.4;
  background-color: transparent;
`;

export const UsernameText = styled.Text`
  background-color: transparent;
  height: 27;
  font-family: 'NunitoSans-Bold';
  font-size: 20;
  font-weight: bold;
  letter-spacing: 2.44;
  text-align: center;
  color: #60686d;
`;

export const EventTitleText = styled.Text`
  background-color: transparent;
  height: 27;
  font-family: 'NunitoSans-Bold';
  font-size: 20;
  font-weight: bold;
  letter-spacing: 2.44;
  text-align: center;
  color: #60686d;
`;

export const YeahColor = styled.Text`
  color: #ff8a65;
  font-family: 'NunitoSans-Bold';
`;

export const NaahColor = styled.Text`
  color: #99ccff;
  font-family: 'NunitoSans-Bold';
`;

export const LocationText = styled.Text`
  font-family: 'NunitoSans-Bold';
  background-color: transparent;
  font-size: 14px;
`;

export const FrienshipFont = styled.Text`font-family: 'Friendship_version_2';`;
