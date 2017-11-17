import React from 'react';
import styled from 'styled-components/native';
import { Text, View } from 'react-native';
import YeahButtonAsset from '../../assets/img/loveAndHate/yeah_200.png';
import NahButtonAsset from '../../assets/img/loveAndHate/naah_200.png';

const LoveAndHateWrapper = styled.View`
  width: 100%;
  height: 90;
  background-color: #000;
  display: flex;
  flex-direction: row;
`;

const LoveAndHatePart = styled.View`
  flex: 1;
  justify-content: center;
`;

const LoveAndHateButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`

`;

/* Component for the preview logo */
const YeahLogo = styled.Image.attrs({
  source: YeahButtonAsset,
  resizeMode: 'contain',
  alignSelf: 'center',
})`
  width: 80;
  height: 80.4;
`;

/* Component for the preview logo */
const NahLogo = styled.Image.attrs({
  source: NahButtonAsset,
  resizeMode: 'contain',
  alignSelf: 'center',
})`
  width: 80;
  height: 80.4;
`;

export default class LoveAndHate extends React.Component {
  render = () => (
    <LoveAndHateWrapper>
      {/* Left part of the component. Contain the button to Yeah the activity */}
      <LoveAndHatePart style={{ backgroundColor: 'blue' }}>
        <LoveAndHateButton
          onPress={() => {
            console.log('YEAH Button pressed');
          }}
        >
          <YeahLogo />
        </LoveAndHateButton>
      </LoveAndHatePart>

      <LoveAndHatePart style={{ backgroundColor: 'red' }}>
        <LoveAndHateButton
          onPress={() => {
            console.log('RESET Button pressed');
          }}
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text>Welcome</Text>
        </LoveAndHateButton>
      </LoveAndHatePart>

      {/* Right part of the component. Contain the button to Nah the activity */}
      <LoveAndHatePart style={{ backgroundColor: 'yellow' }}>
        <LoveAndHateButton
          onPress={() => {
            console.log('NAH Button pressed');
          }}
        >
          <NahLogo />
        </LoveAndHateButton>
      </LoveAndHatePart>
    </LoveAndHateWrapper>
  );
}
