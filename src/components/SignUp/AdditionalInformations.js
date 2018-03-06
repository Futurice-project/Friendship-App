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
} from './Layout';
import Field from 'redux-form/es/Field';
import React from 'react';
import { View } from 'react-native';
import { renderErrorMessage } from './validate';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  signup: state.form.signup,
});

const renderBirthYearField = submittedErrors => {
  return (
    <FieldContainer style={{ marginTop: 19 }}>
      <FieldWrapper>
        <Field
          name="birthDate"
          component={SignUpTextInput}
          placeholder="BIRTH YEAR*"
          keyboardType="numeric"
        />
      </FieldWrapper>
      <HintWrapper>
        <LabelTextHelper>(This will be displayed as age range)</LabelTextHelper>
      </HintWrapper>
      {submittedErrors && submittedErrors.birthDate ? (
        renderErrorMessage(submittedErrors.birthDate)
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
        {submittedErrors && submittedErrors.gender ? (
          renderErrorMessage(submittedErrors.gender)
        ) : null}
      </View>
    </FieldContainer>
  );
};

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
