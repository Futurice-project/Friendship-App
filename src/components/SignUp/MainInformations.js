import React from 'react';
import AvatarList from './AvatarList';
import SignUpTextInput from './TextInput';
import { Field } from 'redux-form';
import { Container, LabelText, Part } from '../Layout/SignupLayout';
import { connect } from 'react-redux';
import { checkErrorMessage } from '../../state/validate';
import SignupField from './SignupField';

const mapStateToProps = state => ({
  signup: state.form.signup,
});

const renderAvatarField = () => {
  return (
    <Part backgroundStyle={'light'}>
      <LabelText style={{ marginTop: 21, marginLeft: 30 }}>
        PICK YOUR MOOD
      </LabelText>
      <Field name="avatar" component={AvatarList} />
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
      returnKeyType={'next'}
      onEnter={() => {
        this._email.focus();
      }}
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
      texthelper={'(private)'}
      keyboardType={'email-address'}
      returnKeyType={'next'}
      focusRef={component => (this._email = component)}
      onEnter={() => {
        this._password.focus();
      }}
      err={checkErrorMessage(submittedErrors, 'EMAIL')}
      style={{ marginTop: 15 }}
    />
  );
};

const renderPwdField = submittedErrors => {
  return (
    <SignupField
      name={'password'}
      component={SignUpTextInput}
      placeholder={'PASSWORD*'}
      texthelper={'(private)'}
      secureTextEntry
      returnKeyType={'next'}
      focusRef={component => (this._password = component)}
      onEnter={() => {
        this._birthyear.focus();
      }}
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
        {renderAvatarField()}
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
