import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { TextInput, View } from 'react-native';

import SignUpTextInput from './SignUpTextInput';
import Emoji from './Emoji';
import styled from 'styled-components/native/index';
import ProgressBar from './ProgressBar';
import GenderBox from './GenderBox';
import RoundTab from '../RoundTab';
import PhotoBox from './PhotoBox';

function MyForm() {
  {
    /*this.props.signup.signupProgress*/
  }
  return (
    <View>
      <HeaderWrapper>
        <ProgressBar steps={'1'} />
        <SignUpTitle>YOUR PROFILE</SignUpTitle>
        <LabelText style={{ marginTop: 21, marginLeft: 30 }}>
          PICK YOUR MOOD
        </LabelText>
        <Field name="emoji" component={Emoji} />
        <LabelContainer>
          <LabelView>
            <Field
              name="username"
              component={SignUpTextInput}
              placeholder="(NICK)NAME*"
            />
          </LabelView>
          <View style={{ width: 278 }}>
            <LabelTextHelper>(visible)</LabelTextHelper>
          </View>
        </LabelContainer>
        <LabelContainer>
          <LabelView>
            <Field
              name="email"
              component={SignUpTextInput}
              keyboardType={'email-address'}
              placeholder="EMAIL*"
            />
          </LabelView>
          <View style={{ width: 278 }}>
            <LabelTextHelper>(private)</LabelTextHelper>
          </View>
        </LabelContainer>
        <LabelContainer>
          <LabelView>
            <Field
              name="pwd"
              component={SignUpTextInput}
              placeholder="PASSWORD*"
            />
          </LabelView>
        </LabelContainer>
      </HeaderWrapper>
      <FirstLabelWrapper>
        <LabelContainer style={{ marginTop: 19 }}>
          <LabelView>
            <Field
              name="birthDate"
              component={SignUpTextInput}
              placeholder="BIRTH YEAR*"
              keyboardType="numeric"
            />
          </LabelView>
          <View style={{ width: 278 }}>
            <LabelTextHelper>
              (This will be displayed as age range)
            </LabelTextHelper>
          </View>
        </LabelContainer>
        <LabelContainer>
          <View style={{ width: 278 }}>
            <TextInput
              autoCorrect={false}
              underlineColorAndroid="transparent"
              placeholderTextColor="#4a4a4a"
              placeholder="GENDER*"
              value=""
              editable={false}
            />
          </View>
          <View style={{ width: 278 }}>
            <LabelTextHelper>(visible)</LabelTextHelper>
          </View>
          <GenderBoxContainer style={{ height: 44 }}>
            <GenderBox
              updateGenders={() => this.updateGenders(1)}
              gender="WOMAN"
            />
            <GenderBox
              updateGenders={() => this.updateGenders(2)}
              gender="MAN"
            />
          </GenderBoxContainer>
          <GenderBoxContainer style={{ height: 44, marginLeft: '38%' }}>
            <GenderBox
              updateGenders={() => this.updateGenders(3)}
              gender="HUMAN"
            />
            <GenderBox
              updateGenders={() => this.updateGenders(4)}
              gender="OTHER"
            />
          </GenderBoxContainer>
        </LabelContainer>
      </FirstLabelWrapper>

      <SecondLabelWrapper>
        <LabelText
          style={{
            marginLeft: 30,
            color: '#4a4a4a',
            fontSize: 15,
            fontFamily: 'NunitoSans-SemiBold',
          }}
        >
          ADD PHOTO
        </LabelText>
        <View style={{ width: 278, marginLeft: 30 }}>
          <LabelTextHelper>
            This can be a photo of anything you like
          </LabelTextHelper>
        </View>
        <ScrollViewPhoto
          contentContainerStyle={styles.scrollViewPhotoContainer}
          horizontal
        >
          <Field name="picture" component={PhotoBox} />
        </ScrollViewPhoto>
        <RoundTabContainer>
          <RoundTab
            titleColor="white"
            tint="#2d4359"
            title="Next"
            style={{ flex: 1 }}
            onPress={() => {}}
          />
        </RoundTabContainer>
      </SecondLabelWrapper>
    </View>
  );
}

const ScrollViewPhoto = styled.ScrollView`margin-top: 11;`;

const RoundTabContainer = styled.View`margin-top: auto;`;

const SecondLabelWrapper = styled.View`
  padding-top: 29;
  width: 100%;
  height: 276;
  flex-direction: column;
  background-color: #e8e9e8;
`;

const GenderBoxContainer = styled.View`
  height: 44;
  width: 100%;
  margin-left: 26%;
  flex-direction: row;
  margin-top: 12;
`;

const FirstLabelWrapper = styled.View`
  width: 100%;
  height: 306;
  display: flex;
  flex-direction: column;
  background-color: #f9f7f6;
  padding-bottom: 16;
`;

const HeaderWrapper = styled.View`
  width: 100%;
  height: 505;
  display: flex;
  flex-direction: column;
  background-color: #e8e9e8;
`;

const SignUpTitle = styled.Text`
  width: 320;
  height: 45;
  font-family: 'Friendship_version_2';
  font-size: 40;
  line-height: 45;
  text-align: justify;
  color: #839297;
  margin-left: 30;
  margin-right: 10;
  margin-top: 37;
`;

const LabelText = styled.Text`
  font-family: 'NunitoSans-SemiBold';
  font-size: 18;
  color: #4a4a4a;
  text-align: left;
`;

const LabelView = styled.View`
  width: 278;
  border-bottom-width: 2;
  border-bottom-color: #979797;
`;

const LabelContainer = styled.View`
  height: 77;
  align-items: center;
  width: 100%;
  margin-top: 10;
`;

const LabelTextHelper = styled.Text`
  font-family: 'NunitoSans-SemiBold';
  font-size: 14;
  color: #9b9b9b;
`;

const styles = {
  headerText: {
    fontFamily: 'NunitoSans-SemiBold',
    fontSize: 20,
    color: '#ff8a65',
  },
  buttonTextStyle: {
    width: 230,
    height: 27,
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'NunitoSans-Regular',
    textAlign: 'center',
    color: 'white',
  },
  statusTextStyle: {
    fontFamily: 'NunitoSans-Regular',
    width: '100%',
    height: 20,
    fontSize: 15,
    textAlign: 'center',
    color: '#f673f7',
    marginBottom: 10,
  },
  textStyle: {
    fontFamily: 'NunitoSans-Regular',
    width: '100%',
    height: 20,
    fontSize: 15,
    textAlign: 'center',
    color: '#f9f7f6',
    marginBottom: 10,
  },
  scrollViewPhotoContainer: {
    justifyContent: 'space-around',
    height: 93,
    paddingLeft: 30,
  },
  scrollViewMoodContainer: {
    justifyContent: 'space-around',
    height: 70,
    paddingRight: 23,
    paddingLeft: 23,
  },
};

export default reduxForm({ form: 'SignUp' })(MyForm);
