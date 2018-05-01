import Genders from './Genders';
import SignUpTextInput from './SignUpTextInput';
import {
  Container,
  FieldContainer,
  FieldWrapper,
  HintWrapper,
  LabelText,
  LabelTextHelper,
  Part,
} from '../Layout/SignupLayout';
import Field from 'redux-form/es/Field';
import React from 'react';
import { View } from 'react-native';
import { checkErrorMessage, renderErrorMessage } from './validate';
import { connect } from 'react-redux';
import { hide } from '../../state/keyboard';

const mapStateToProps = state => ({
  signup: state.form.signup,
});

const renderBirthYearField = submittedErrors => {
  return (
    <FieldContainer style={{ marginTop: 19 }}>
      <FieldWrapper>
        <Field
          name="birthyear"
          returnKeyType={'done'}
          component={SignUpTextInput}
          placeholder="BIRTH YEAR*"
          keyboardType="numeric"
          focusRef={component => (this._birthyear = component)}
          onEnter={hide}
        />
      </FieldWrapper>
      <HintWrapper>
        <LabelTextHelper>(This will be displayed as age range)</LabelTextHelper>
      </HintWrapper>
      {checkErrorMessage(submittedErrors, 'BIRTHYEAR') ? (
        renderErrorMessage(submittedErrors.birthyear)
      ) : null}
    </FieldContainer>
  );
};

const renderGenderPicker = submittedErrors => {
  return (
    <FieldContainer>
      <View style={{ width: 278 }}>
        <LabelText>GENDER*</LabelText>
      </View>
      <HintWrapper>
        <LabelTextHelper>(visible)</LabelTextHelper>
      </HintWrapper>
      <Field name="gender" component={Genders} />
      <View style={{ paddingTop: 10 }}>
        {checkErrorMessage(submittedErrors, 'GENDERS') ? (
          renderErrorMessage(submittedErrors.gender)
        ) : null}
      </View>
    </FieldContainer>
  );
};

/**
 * Renders additionnal information fields :
 * - Birth Year
 * - Genders
 * */
class AdditionalInformations extends React.Component {
  render() {
    return (
      <Container>
        <Part backgroundStyle={'light'}>
          {renderBirthYearField(
            this.props.signup ? this.props.signup.submitErrors : null,
          )}
          {renderGenderPicker(
            this.props.signup ? this.props.signup.submitErrors : null,
          )}
        </Part>
      </Container>
    );
  }
}

export default connect(mapStateToProps, null)(AdditionalInformations);
