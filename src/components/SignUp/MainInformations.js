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
} from '../Layout/SignupLayout';
import { connect } from 'react-redux';
import { renderErrorMessage } from './validate';
import SignupField from './SignupField';

const mapStateToProps = state => ({
  signup: state.form.signup,
});

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

const renderUsernameField = submittedErrors => {
  console.log('Rendering username ...');
  console.log(submittedErrors);
  return (
    <SignupField
      name={'username'}
      component={SignUpTextInput}
      placeholder={'(NICK)NAME*'}
      hinttext
      texthelper={'(visible)'}
      err={submittedErrors => {
        console.log('Error ...');
        console.log(submittedErrors);
        if (submittedErrors && submittedErrors.username) {
          console.log(submittedErrors.username);
          return submittedErrors.username;
        }
      }}
    />
    /*    < FieldContainer
      style = {
      {
        marginTop: 15
      }
    }>
    <
      FieldWrapper >
      < Field
      name = "username"
      component = {SignUpTextInput}
      placeholder = "(NICK)NAME*"
        / >
        < /FieldWrapper>
      <HintWrapper>
        <LabelTextHelper>(visible)</LabelTextHelper>
      </HintWrapper>
      {
        submittedErrors && submittedErrors.username ? (
          renderErrorMessage(submittedErrors.username)
        ) : null
      }
    </FieldContainer>*/
  );
};

const renderEmailField = submittedErrors => {
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
      {submittedErrors && submittedErrors.email ? (
        renderErrorMessage(submittedErrors.email)
      ) : null}
    </FieldContainer>
  );
};

const renderPwdField = submittedErrors => {
  return (
    <FieldContainer>
      <FieldWrapper>
        <Field name="pwd" component={SignUpTextInput} placeholder="PASSWORD*" />
      </FieldWrapper>
      {submittedErrors && submittedErrors.pwd ? (
        renderErrorMessage(submittedErrors.pwd)
      ) : null}
    </FieldContainer>
  );
};

/**
 * Renders the fields for the user to enter his/hers main information :
 * - username
 * - email
 * - password
 * */
class MainInformations extends React.Component {
  render() {
    return (
      <Container>
        {renderEmojiField()}
        <Part>
          {renderUsernameField(
            this.props.signup ? this.props.signup.submitErrors : null,
          )}
          {renderEmailField(
            this.props.signup ? this.props.signup.submitErrors : null,
          )}
          {renderPwdField(
            this.props.signup ? this.props.signup.submitErrors : null,
          )}
        </Part>
      </Container>
    );
  }
}

export default connect(mapStateToProps, null)(MainInformations);
