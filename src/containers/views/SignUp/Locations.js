import React from 'react';
import { LOCATION } from '../../../components/SignUp/ProgressSteps';
import {
  checkErrorMessage,
  renderErrorMessage,
  validateLocations,
} from '../../../state/validate';
import { Field, reduxForm } from 'redux-form';
import LocationList from '../../../components/SignUp/LocationList';
import { View } from 'react-native';
import SignupHeader from '../../../components/SignUp/Header';
import {
  Container,
  FieldContainer,
  LabelText,
  Part,
} from '../../../components/Layout/SignupLayout';
import Footer from '../../../components/SignUp/Footer';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  signup: state.form.signup,
});

const renderLocationField = submittedErrors => {
  const err = checkErrorMessage(submittedErrors, 'LOCATIONS');
  return (
    <Container style={{ flex: 1 }}>
      <Part style={{ flex: 2 }}>
        <LabelText style={{ marginTop: 21, marginLeft: 30, marginRight: 30 }}>
          With your location, we will find the happenings, groups and people
          closest to you.
        </LabelText>
      </Part>
      <Part style={{ flex: 8 }}>
        <Field name={'locations'} component={LocationList} />
        <FieldContainer>{err ? renderErrorMessage(err) : null}</FieldContainer>
      </Part>
      <Footer style={{ flex: 2 }} textColor={'blue'} />
    </Container>
  );
};

class SignUpLocation extends React.Component {
  state = {
    selectedLocations: [],
  };

  render() {
    return (
      <View
        style={{ display: 'flex', height: '100%', flexDirection: 'column' }}
      >
        <SignupHeader processStage={LOCATION} headerTitle={'HEY !'} />
        {renderLocationField(
          this.props.signup ? this.props.signup.submitErrors : null,
        )}
      </View>
    );
  }
}

export default connect(mapStateToProps, null)(
  reduxForm({
    form: 'signup',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    onSubmit: validateLocations,
    onSubmitSuccess: (result, dispatch, props) => {
      dispatch(props.onSubmitSucceeded);
    },
  })(SignUpLocation),
);
