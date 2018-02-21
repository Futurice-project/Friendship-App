import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { ScrollView, View } from 'react-native';

import SignUpTextInput from './SignUpTextInput';
import Emoji from './Emoji';
import styled from 'styled-components/native/index';
import ProgressBar from './ProgressBar';

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
      </FirstLabelWrapper>
    </View>
  );
}

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

export default reduxForm({ form: 'SignUp' })(MyForm);
