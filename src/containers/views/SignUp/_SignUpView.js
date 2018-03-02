import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ViewContainer } from '../../../components/Layout/Layout';
import { reduxForm } from 'redux-form';
import Footer from '../../../components/SignUp/Footer';
import { YOUR_PROFILE } from '../../../components/SignUp/Constants';
import SignupHeader from '../../../components/SignUp/SignupHeader';
import MainInformations from '../../../components/SignUp/MainInformations';
import AdditionalInformations from '../../../components/SignUp/AdditionalInformations';
import PicturePicker from '../../../components/SignUp/PicturePicker';

const validate = values => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Required';
  }
  return errors;
};

class SignUpView extends React.Component {
  render() {
    return (
      <KeyboardAwareScrollView
        extraHeight={30}
        enableResetScrollToCoords={false}
        enableOnAndroid={true}
        enableAutoAutomaticScroll={true}
      >
        <ViewContainer>
          <SignupHeader processStage={YOUR_PROFILE} backgroundStyle={'light'} />
          <MainInformations />
          <AdditionalInformations />
          <PicturePicker />
          <Footer />
        </ViewContainer>
      </KeyboardAwareScrollView>
    );
  }
}

export default reduxForm({ form: 'signUp' }, validate)(SignUpView);
