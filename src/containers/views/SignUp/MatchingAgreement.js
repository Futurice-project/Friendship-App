import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import styled from 'styled-components/native';
import { Padding, ViewContainer } from '../../../components/Layout/Layout';
import DescriptionBubble from '../../../components/BubbleTextInput';
import ProgressBar from '../../../components/SignUp/ProgressBar';
import RoundTab from '../../../components/RoundTab';
import { connect } from 'react-redux';
import { MATCHING_AGREEMENT } from '../../../components/SignUp/ProgressSteps';
import {
  checkErrorMessage,
  renderErrorMessage,
  validateMatching,
} from '../../../state/validate';
import { Field, reduxForm, submit } from 'redux-form';
import Toggle from '../../../components/Toggle';
import { FieldContainer } from '../../../components/Layout/SignupLayout';
import rest from '../../../utils/rest';

const mapStateToProps = state => ({
  signup: state.form.signup,
});

function createUser(dispatch, formValues) {
  let formData = createFormData(formValues);
  dispatch(
    rest.actions.register(
      {},
      { body: formData, headers: { 'Content-Type': 'multipart/form-data' } },
    ),
  );
}

function createFormData(formValues) {
  let tempFormData = new FormData();

  tempFormData.append('username', formValues.username);
  tempFormData.append('email', formValues.email);
  tempFormData.append('password', formValues.password);
  tempFormData.append('birthyear', formValues.birthyear);
  tempFormData.append('enableMatching', formValues.enableMatching);
  tempFormData.append('description', formValues.description);

  if (formValues.picture) {
    tempFormData.append('image', {
      uri: formValues.picture.uri,
      name: 'image.png',
      type: 'multipart/form-data',
    });
  }

  if (formValues.gender) {
    tempFormData.append('genders', JSON.stringify(formValues.gender));
  }

  if (formValues.locations) {
    tempFormData.append('locations', JSON.stringify(formValues.locations));
  }

  if (formValues.personalities) {
    tempFormData.append(
      'personalities',
      JSON.stringify(formValues.personalities),
    );
  }

  if (formValues.yeahsAndNaahs) {
    if (formValues.yeahsAndNaahs.yeahs) {
      tempFormData.append(
        'yeahs',
        JSON.stringify(formValues.yeahsAndNaahs.yeahs),
      );
    }
    if (formValues.yeahsAndNaahs.nahs) {
      tempFormData.append(
        'nahs',
        JSON.stringify(formValues.yeahsAndNaahs.nahs),
      );
    }
  }

  return tempFormData;
}

class SignUpMatching extends React.Component {
  state = {
    enableMatching: false,
    description: '',
  };

  render = () => {
    const err = this.props.signup
      ? checkErrorMessage(
          this.props.signup.submitErrors,
          'MATCHING_DESCRIPTION',
        )
      : null;
    return (
      <KeyboardAvoidingView
        behavior={Platform.select({
          ios: () => 'position',
          android: () => 'padding',
        })()}
      >
        <ViewContainer style={{ backgroundColor: '#e8e9e8' }}>
          <ProgressBar steps={MATCHING_AGREEMENT} />
          <Padding>
            <Title>FINDING THE RIGHT PEOPLE FOR YOU</Title>
            <P>Do you want to receive recommendation on people</P>
            <Field
              name={'enableMatching'}
              component={Toggle}
              leftText="NO THANK YOU"
              rightText="YES, PLEASE"
              toggled={this.state.enableMatching}
              onPress={input =>
                this.updateMatchingAgreement(input, !this.state.enableMatching)}
            />
            <InfoText>
              This means that your profile is public when you join an event or a
              group, but you won’t be recommended people near your location
            </InfoText>

            <SubTitle>WOULD YOU LIKE TO ADD A SMALL BIO?</SubTitle>
            <Field
              name={'description'}
              component={DescriptionBubble}
              text="ADD A DESCRIPTION"
              description={this.state.description}
              placeholder="You can tell your future friends about your interests, what you’re looking for or what you think friendship is…"
              onChangeText={(input, newDescription) =>
                this.updateDescription(input, newDescription)}
            />
            <FieldContainer>
              {err ? renderErrorMessage(err) : null}
            </FieldContainer>
            <InfoText>You can always add and change this information</InfoText>
          </Padding>
          <RoundTab
            title="Next"
            tint="#2d4359"
            titleColor="#fff"
            onPress={() => this.props.dispatch(submit('signup'))}
          />
        </ViewContainer>
      </KeyboardAvoidingView>
    );
  };

  updateMatchingAgreement(input, enableMatching) {
    input.onChange(enableMatching);
    this.setState({ enableMatching });
  }

  updateDescription(input, newDescription) {
    input.onChange(newDescription);
    this.setState({ description: newDescription });
  }
}

const Title = styled.Text`
  font-family: 'Friendship_version_2';
  font-size: 40;
  line-height: 36;
  text-align: left;
  align-self: center;
  margin-top: 30;
  margin-left: 5%;
  color: #839297;
`;
const P = styled.Text`
  font-family: 'NunitoSans-Regular';
  font-size: 16;
  font-weight: 300;
  line-height: 24;
  text-align: left;
  color: #4a4a4a;
  margin-left: 30;
  margin-right: 30;
  margin-bottom: 13;
  margin-top: 10;
`;
const SubTitle = styled.Text`
  font-family: 'NunitoSans-Regular';
  font-size: 13;
  font-weight: 600;
  letter-spacing: 1.5;
  text-align: left;
  margin-left: 30;
  margin-right: 30;
  margin-bottom: 30;
  color: #4a4a4a;
`;
const InfoText = styled.Text`
  font-family: 'NunitoSans-Regular';
  font-size: 13;
  line-height: 16;
  letter-spacing: 1.59;
  text-align: left;
  align-self: center;
  color: #9b9b9b;
  margin-left: 30;
  margin-right: 30;
  margin-bottom: 50;
`;

export default reduxForm({
  form: 'signup',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  onSubmit: validateMatching,
  onSubmitSuccess: (result, dispatch, props) => {
    createUser(dispatch, props.values);
  },
})(connect(mapStateToProps, null)(SignUpMatching));
