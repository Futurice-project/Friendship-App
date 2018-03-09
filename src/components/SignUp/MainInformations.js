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
import { checkErrorMessage, renderErrorMessage } from './validate';
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
  return (
    <SignupField
      name={'username'}
      component={SignUpTextInput}
      placeholder={'(NICK)NAME*'}
      texthelper={'(visible)'}
      err={checkErrorMessage(submittedErrors, 'USERNAME')}
    />
  );
};

const renderEmailField = submittedErrors => {
  return (
    <SignupField
      name={'email'}
      component={SignUpTextInput}
      placeholder={'EMAIL*'}
      hinttext
      texthelper={'(private)'}
      keyboardType={'email-address'}
      err={checkErrorMessage(submittedErrors, 'EMAIL')}
      style={{ marginTop: 15 }}
    />
  );
};

const renderPwdField = submittedErrors => {
  return (
    <SignupField
      name={'pwd'}
      component={SignUpTextInput}
      placeholder={'PASSWORD*'}
      err={checkErrorMessage(submittedErrors, 'PASSWORD')}
    />
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
