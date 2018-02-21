import React from 'react';
import { reduxForm, Field, FormSection, FieldArray } from 'redux-form';
import { ScrollView, Text, TouchableOpacity } from 'react-native';

import MyTextInput from './MyTextInput';
import { emojis } from '../../../assets/misc/emojis';
import SignUpEmoji from './SignUpEmoji';
import { UPDATE_EMOJI } from '../../state/signup';
import styled from 'styled-components/native/index';
import Emoji from './Emoji';

function MyForm() {
  return (
    <ScrollView keyboardShouldPersistTaps={'handled'}>
      <Field name="emoji" component={Emoji} />
      {/*<FormSection name="userInfos">
      <Field name="email" component={Email}/>
        <Field name="pwd"/>
        <Field name="birthDate"/>
      </FormSection>
      <FormSection name="sexe">

      </FormSection>*/}
    </ScrollView>
  );
}

export default reduxForm({ form: 'SignUp' })(MyForm);
