import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { ScrollView, Text, TouchableOpacity } from 'react-native';

import MyTextInput from './MyTextInput';
import { emojis } from '../../../assets/misc/emojis';
import SignUpEmoji from './SignUpEmoji';
import { UPDATE_EMOJI } from '../../state/signup';
import styled from 'styled-components/native/index';
import Emoji from './Emoji';

function MyForm({ handleChange, value }) {
  return (
    <ScrollView keyboardShouldPersistTaps={'handled'}>
      <Field name={'emoji'} component={Emoji} />
    </ScrollView>
  );
}

export default reduxForm({ form: 'SignUp' })(MyForm);
