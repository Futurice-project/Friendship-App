import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { ScrollView } from 'react-native';

import SignUpTextInput from './SignUpTextInput';
import Emoji from './Emoji';

function MyForm() {
  return (
    <ScrollView keyboardShouldPersistTaps={'handled'}>
      <Field name="emoji" component={Emoji} />
      <Field
        name="username"
        component={SignUpTextInput}
        placeholder="(NICK)NAME*"
      />
      <Field
        name="email"
        component={SignUpTextInput}
        keyboardType={'email-address'}
        placeholder="EMAIL*"
      />
      <Field name="pwd" component={SignUpTextInput} placeholder="PASSWORD*" />
      <Field
        name="birthDate"
        component={SignUpTextInput}
        placeholder="BIRTH YEAR*"
        keyboardType="numeric"
      />
      {/*<FormSection name="userInfos">
      </FormSection>
      <FormSection name="sexe">

      </FormSection>*/}
    </ScrollView>
  );
}

export default reduxForm({ form: 'SignUp' })(MyForm);
