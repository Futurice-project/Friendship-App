import React from 'react';
import styled from 'styled-components/native';
import { Text, View } from 'react-native';
import YeahButtonAsset from '../../assets/img/loveAndHate/yeah_200.png';
import NahButtonAsset from '../../assets/img/loveAndHate/naah_200.png';
import { StyleSheet } from 'react-native';

const LoveAndHateWrapper = styled.View`
  width: 100%;
  height: 90;
  background-color: #dad5d2;
  display: flex;
  flex-direction: row;
  margin-top: 10;
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

const styles = StyleSheet.create({
  activity: {
    fontFamily: 'NunitoSans-Regular',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 34.0,
  },
});

/**
 * @param {String} activity - name of the activity
 */
export default class LoveAndHate extends React.Component {
  state: {
    status: 0,
  };

  hideChoice(choiceEnabled, choiceDisabled) {}

  yeahActivity() {
    console.log('Yeah-ing activity ' + this.props.activity);
  }

  nahActivity() {
    console.log('Nah-ing activity ' + this.props.activity);
  }

  resetChoice() {
    console.log('Resetting choice ' + this.props.activity);
    /*if (this.state.status !== 0) {
      console.log("Starting resetting...");
    }*/
  }

  render = () => (
    <LoveAndHateWrapper>
      {/* Left part of the component. Contain the button to Yeah the activity */}
      <LoveAndHatePart>
        <LoveAndHateButton
          onPress={() => {
            console.log('YEAH Button pressed');
            this.yeahActivity();
          }}
        >
          <YeahLogo />
        </LoveAndHateButton>
      </LoveAndHatePart>

      {/* Middle part of the component. Contain the button to Reset the choice Yeah or Nah */}
      <LoveAndHatePart>
        <LoveAndHateButton
          onPress={() => {
            console.log('RESET Button pressed');
            this.resetChoice();
          }}
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text style={styles.activity}>{this.props.activity}</Text>
        </LoveAndHateButton>
      </LoveAndHatePart>

      {/* Right part of the component. Contain the button to Nah the activity */}
      <LoveAndHatePart>
        <LoveAndHateButton
          onPress={() => {
            console.log('NAH Button pressed');
            this.nahActivity();
          }}
        >
          <NahLogo />
        </LoveAndHateButton>
      </LoveAndHatePart>
    </LoveAndHateWrapper>
  );
}
