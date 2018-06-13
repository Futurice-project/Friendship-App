import React from 'react';
import styled from 'styled-components/native';
import {
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  UIManager,
} from 'react-native';
import YeahButtonAsset from '../../../assets/img/loveAndHate/yeah_200.png';
import NahButtonAsset from '../../../assets/img/loveAndHate/naah_200.png';

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

const LoveAndHatePart = styled.TouchableOpacity`
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

const CustomLayoutSpring = {
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
export default class YeahAndNaah extends React.Component {
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

  yeahActivity(updateYeahsAndNahs) {
    const { activityId } = this.props;

    updateYeahsAndNahs('YEAH', activityId);

    this.setState({
      wrapperColor: -1,
      yeahButton: false,
      nahButton: false,
    });
    LayoutAnimation.configureNext(CustomLayoutSpring);
  }

  nahActivity(updateYeahsAndNahs) {
    const { activityId } = this.props;

    updateYeahsAndNahs('NAH', activityId);

    this.setState({
      wrapperColor: 1,
      yeahButton: false,
      nahButton: false,
    });
    LayoutAnimation.configureNext(CustomLayoutSpring);
  }

  resetChoice(updateYeahsAndNahs) {
    const { activityId } = this.props;

    updateYeahsAndNahs('RESET', activityId);

    this.setState({
      wrapperColor: 0,
      yeahButton: true,
      nahButton: true,
    });
    LayoutAnimation.configureNext(CustomLayoutSpring);
  }

  renderYeah(updateYeahsAndNahs) {
    if (this.state.yeahButton) {
      return (
        <LoveAndHatePart
          onPress={() => {
            this.yeahActivity(updateYeahsAndNahs);
          }}
        >
          <YeahLogo />
        </LoveAndHatePart>
      );
    }
  }

  renderNah(updateYeahsAndNahs) {
    if (this.state.nahButton) {
      return (
        <LoveAndHatePart
          onPress={() => {
            this.nahActivity(updateYeahsAndNahs);
          }}
        >
          <NahLogo />
        </LoveAndHatePart>
      );
    }
  }

  render = () => {
    const { updateYeahsAndNahs } = this.props;

    return (
      <LoveAndHateWrapper wrapperColor={this.state.wrapperColor}>
        {/* Left part of the component. Contain the button to Yeah the activity */}
        {this.renderYeah(updateYeahsAndNahs)}
        {/* Middle part of the component. Contain the button to Reset the choice Yeah or Nah */}
        <LoveAndHatePart
          textAligment={this.state.wrapperColor}
          onPress={() => {
            this.resetChoice(updateYeahsAndNahs);
          }}
        >
          <Text style={styles.activity}>{this.props.activityName}</Text>
        </LoveAndHatePart>

        {/* Right part of the component. Contain the button to Nah the activity */}
        {this.renderNah(updateYeahsAndNahs)}
      </LoveAndHateWrapper>
    );
  };
}
