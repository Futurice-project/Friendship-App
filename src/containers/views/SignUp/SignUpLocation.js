import React from 'react';
import { connect } from 'react-redux';
import rest from '../../../utils/rest';
import styled from 'styled-components/native';
import { NavigationActions } from 'react-navigation';
import {
  SignUpWrapper,
  ViewContainer,
} from '../../../components/Layout/Layout';
import RoundTab from '../../../components/RoundTab';
import ProgressBar from '../../../components/SignUp/ProgressBar';
import { LOCATION, YOUR_PROFILE } from '../../../components/SignUp/Constants';
import validate from '../../../components/SignUp/validate';
import { Field, reduxForm, submit } from 'redux-form';
import LocationList from '../../../components/SignUp/LocationList';
import { View } from 'react-native';
import SignupHeader from '../../../components/SignUp/SignupHeader';
import {
  Container,
  LabelText,
  Part,
} from '../../../components/Layout/SignupLayout';
import Footer from '../../../components/SignUp/Footer';

class SignUpLocation extends React.Component {
  state = {
    selectedLocations: [],
  };

  render() {
    const { dispatch } = this.props;

    return (
      <View
        style={{ display: 'flex', height: '100%', flexDirection: 'column' }}
      >
        <SignupHeader processStage={LOCATION} headerTitle={'HEY !'} />
        <Container style={{ flex: 1, backgroundColor: '#efebe9' }}>
          <Part style={{ flex: 2 }}>
            <LabelText
              style={{ marginTop: 21, marginLeft: 30, marginRight: 30 }}
            >
              With your location, we will find the happenings, groups and people
              closest to you.
            </LabelText>
          </Part>
          <Part style={{ flex: 8, marginTop: 45 }}>
            <Field name={'locations'} component={LocationList} />
          </Part>
          <Footer style={{ flex: 1 }} textColor={'blue'} />
        </Container>
      </View>
    );
  }
}

export default reduxForm({
  form: 'signup',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  onSubmit: validate,
  onSubmitSuccess: (result, dispatch, props) => {
    dispatch(props.onSubmitSucceeded);
  },
})(SignUpLocation);
