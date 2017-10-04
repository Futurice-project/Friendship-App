import React from 'react';
import { connect } from 'react-redux';
import { SignUpViewWrapper } from '../../components/Layout';
import DropDown from '../../components/DropDown';
import { Image, View } from 'react-native';
import TextInput from '../../components/TextInput';
import styled from 'styled-components/native';
import BackgroundLogoAsset from '../../../assets/drawable-mdpi/combined_shape_copy_2.png';

const mapStateToProps = state => ({
  value: state.signUpLocation.value,
});

const mapDispatchToProps = dispatch => ({});

const SignUpWrapper = styled.View`
  display: flex;
  background-color: #ffffff;
  width: 100%;
`;

/* Wrapper for the text */
const SignUpTitle = styled.Text`
  width: 121;
  height: 45;
  font-family: 'Friendship_version_2';
  font-size: 40;
  line-height: 45;
  text-align: center;
  color: #2d4359;
`;

const SignUpWelcomeText = styled.Text`
  width: 300;
  height: 90;
  font-family: 'NunitoSans-Regular';
  font-size: 15;
  font-weight: 300;
  line-height: 25;
  color: #2d4359;
  text-align: justify;
`;

const SignUpInfoText = styled.Text`
  width: 300;
  height: 88;
  font-family: 'NunitoSans-Regular';
  font-size: 14;
  font-weight: 300;
  line-height: 19;
  letter-spacing: 1;
  text-align: center;
  color: #2d4359;
`;

const Wrapper = styled.View``;

export class SignUpLocation extends React.Component {
  render = () => (
    <SignUpViewWrapper>
      <SignUpWrapper
        style={{
          paddingTop: 60,
          paddingLeft: 30,
          paddingRight: 30,
          backgroundColor: 'transparent',
          flex: 2,
        }}
      >
        <SignUpTitle>MOIKA!</SignUpTitle>
        <SignUpWelcomeText>
          Kertomalla seuraavat tiedot löydät itsellesi oikeat ihmiset ja
          tekemiset läheltäsi!
        </SignUpWelcomeText>
      </SignUpWrapper>

      <SignUpWrapper style={{ flex: 4, justifyContent: 'center' }}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <DropDown title="YOUR LOCATION" />
        </View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <TextInput
            title="WHAT'S YOUR NEIGHBORHOOD ?"
            placeholder="HERTTONIEMI"
          />
        </View>
      </SignUpWrapper>

      <SignUpWrapper style={{ backgroundColor: 'transparent', flex: 3 }}>
        <Wrapper
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <SignUpInfoText>
            Kaikki tiedot voi muuttaa myöhemmin profiilin asetuksista. You can
            always change this details in your profile settings.
          </SignUpInfoText>
        </Wrapper>
        <Wrapper style={{ flex: 1 }}>
          <Image
            source={BackgroundLogoAsset}
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'flex-end',
            }}
          />
        </Wrapper>
      </SignUpWrapper>
    </SignUpViewWrapper>
  );

  static navigationOptions = {
    title: 'SignUpLocation',
    header: () => null,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpLocation);
