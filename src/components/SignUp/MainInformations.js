import React from 'react';
import Emoji from './Emoji';
import SignUpTextInput from './SignUpTextInput';
import { Field } from 'redux-form';
import {
  Container,
  FieldContainer,
  FieldWrapper,
  HintWrapper,
  LabelText,
  LabelTextHelper,
  Part,
} from './Layout';

const renderEmojiField = () => {
  return (
    <Part backgroundStyle={'light'}>
      <LabelText style={{ marginTop: 21, marginLeft: 30 }}>
        PICK YOUR MOOD
      </LabelText>
      <Field name="emoji" component={Emoji} />
    </Part>
  );
};

const renderUsernameField = () => {
  return (
    <FieldContainer style={{ marginTop: 15 }}>
      <FieldWrapper>
        <Field
          name="username"
          component={SignUpTextInput}
          placeholder="(NICK)NAME*"
        />
      </FieldWrapper>
      <HintWrapper>
        <LabelTextHelper>(visible)</LabelTextHelper>
      </HintWrapper>
    </FieldContainer>
  );
};

const renderEmailField = () => {
  return (
    <FieldContainer>
      <FieldWrapper>
        <Field
          name="email"
          component={SignUpTextInput}
          keyboardType={'email-address'}
          placeholder="EMAIL*"
        />
      </FieldWrapper>
      <HintWrapper>
        <LabelTextHelper>(private)</LabelTextHelper>
      </HintWrapper>
    </FieldContainer>
  );
};

const renderPwdField = () => {
  return (
    <FieldContainer>
      <FieldWrapper>
        <Field name="pwd" component={SignUpTextInput} placeholder="PASSWORD*" />
      </FieldWrapper>
    </FieldContainer>
  );
};

export default class MainInformations extends React.Component {
  render() {
    return (
      <Container>
        {renderEmojiField()}
        <Part>
          {renderUsernameField()}
          {renderEmailField()}
          {renderPwdField()}
        </Part>
      </Container>
    );
  }
}
