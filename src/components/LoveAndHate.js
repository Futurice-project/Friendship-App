import React from 'react';
import styled from 'styled-components/native';
import { Text, View } from 'react-native';
import YeahButtonAsset from '../../assets/img/loveAndHate/yeah_200.png';
import NahButtonAsset from '../../assets/img/loveAndHate/naah_200.png';
import { StyleSheet, LayoutAnimation, UIManager, Platform } from 'react-native';

const LoveAndHateWrapper = styled.View`
  width: 100%;
  height: 90;
  background-color: ${props => {
    switch (props.wrapperColor) {
      case -1:
        return '#ff8a65';
      case 1:
        return '#99ccff';
      default:
        return '#dad5d2';
    }
  }};
  display: flex;
  flex-direction: row;
  margin-top: 10;
`;

const LoveAndHatePart = styled.View`
  flex: 1;
  justify-content: center;
  align-items: ${props => {
    switch (props.textAligment) {
      case -1:
        return 'flex-start';
      case 1:
        return 'flex-end';
      default:
        return 'center';
    }
  }};
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
    color: '#ffffff',
    paddingLeft: 5,
    paddingRight: 5,
  },
});
var CustomLayoutSpring = {
  duration: 400,
  create: {
    type: LayoutAnimation.Types.spring,
    property: LayoutAnimation.Properties.scaleXY,
    springDamping: 0.7,
  },
  update: {
    type: LayoutAnimation.Types.spring,
    springDamping: 0.7,
  },
};
/**
 * @param {String} activity - name of the activity
 */
export default class LoveAndHate extends React.Component {
  constructor() {
    super();
    //The following code must be set to use LayoutAnimation
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
  state = {
    status: 0,
    yeahButton: true,
    nahButton: true,
    wrapperColor: 0,
  };

  yeahActivity() {
    console.log(
      'Yeah-ing activity ' + this.props.activity + ' : Move title to the left',
    );
    this.setState({
      wrapperColor: -1,
      yeahButton: false,
      nahButton: false,
    });
    LayoutAnimation.configureNext(CustomLayoutSpring);
  }

  nahActivity() {
    console.log(
      'Nah-ing activity ' + this.props.activity + ' : Move title to the right',
    );
    this.setState({
      wrapperColor: 1,
      yeahButton: false,
      nahButton: false,
    });
    LayoutAnimation.configureNext(CustomLayoutSpring);
  }

  resetChoice() {
    console.log(
      'Resetting choice ' + this.props.activity + ' : Reset view as initial',
    );
    this.setState({
      wrapperColor: 0,
      yeahButton: true,
      nahButton: true,
    });
    LayoutAnimation.configureNext(CustomLayoutSpring);

    /*if (this.state.status !== 0) {
     console.log("Starting resetting...");
     }*/
  }
  renderYeah() {
    if (this.state.yeahButton) {
      return (
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
      );
    }
  }
  renderNah() {
    if (this.state.nahButton) {
      return (
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
      );
    }
  }
  render = () => (
    <LoveAndHateWrapper wrapperColor={this.state.wrapperColor}>
      {/* Left part of the component. Contain the button to Yeah the activity */}
      {this.renderYeah()}
      {/* Middle part of the component. Contain the button to Reset the choice Yeah or Nah */}
      <LoveAndHatePart textAligment={this.state.wrapperColor}>
        <LoveAndHateButton
          onPress={() => {
            console.log('RESET Button pressed');
            this.resetChoice();
          }}
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          position={this.state.wrapperColor}
        >
          <Text style={styles.activity}>{this.props.activity}</Text>
        </LoveAndHateButton>
      </LoveAndHatePart>

      {/* Right part of the component. Contain the button to Nah the activity */}
      {this.renderNah()}
    </LoveAndHateWrapper>
  );
}
