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

const renderBirthYearField = () => {
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
    </FieldContainer>
  );
};

const renderGenderPicker = () => {
  return (
    <FieldContainer>
      <View style={{ width: 278 }}>
        <LabelText>GENDER*</LabelText>
      </View>
      <HintWrapper>
        <LabelTextHelper>(visible)</LabelTextHelper>
      </HintWrapper>
      <Field name="gender" component={Genders} />
    </FieldContainer>
  );
};

export default class AdditionalInformations extends React.Component {
  render() {
    return (
      <Container>
        <Part backgroundStyle={'light'}>
          {renderBirthYearField()}
          {renderGenderPicker()}
        </Part>
      </Container>
    );
  }
}
