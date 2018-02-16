import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { ScrollView, Text, TouchableOpacity } from 'react-native';

import MyTextInput from './MyTextInput';

function MyForm(props) {
  return (
    <ScrollView keyboardShouldPersistTaps={'handled'}>
      <Text>Email</Text>
      <Field
        name={'username'}
        component={MyTextInput}
        validate={[
          val => (val ? undefined : 'Password field is required'),
          val =>
            val && val.length >= 8
              ? undefined
              : 'Password must be at least 8 characters long',
        ]}
      />
      <TouchableOpacity onPress={props.handleSubmit}>
        <Text>Submit!</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

export default reduxForm({ form: 'SignUp' })(MyForm);
