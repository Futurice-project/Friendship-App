import styled from 'styled-components/native';

export const Text = styled.Text`color: #4b5c5d;`;
export const Bold = Text.extend`font-weight: bold;`;

export const Title = Bold.extend`
  font-size: 28;
  text-align: center;
  padding: 16px;
`;

export const Description = Title.extend`
  font-size: 24;
  font-weight: normal;
`;

export const CenteredText = Bold.extend`text-align: center;`;

// Text for inbox page
export const SenderName = styled.Text`
  font-size: 18;
  font-weight: bold;
  color: #666;
`;

export const GrayText = styled.Text`color: #b1b1b1;`;

export const TimeText = styled.Text`
  color: #555;
  font-size: 10px;
`;

export const CenterIconText = styled.Text`
  text-align: center;
  padding-top: 11px;
  color: white;
  font-size: 20px;
`;
