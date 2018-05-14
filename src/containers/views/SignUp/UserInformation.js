import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ViewContainer } from '../../../components/Layout/Layout';
import { reduxForm } from 'redux-form';
import Footer from '../../../components/SignUp/Footer';
import { YOUR_PROFILE } from '../../../components/SignUp/ProgressSteps';
import SignupHeader from '../../../components/SignUp/Header';
import MainInformations from '../../../components/SignUp/MainInformations';
import AdditionalInformations from '../../../components/SignUp/AdditionalInformations';
import PicturePicker from '../../../components/SignUp/PicturePicker';
import { validateUserInformations } from '../../../state/validate';

/* The sign up process starts here with the user's information */
class UserInformation extends React.Component {
  render() {
    return (
      <KeyboardAwareScrollView
        extraHeight={30}
        enableResetScrollToCoords={false}
        enableOnAndroid={true}
        enableAutoAutomaticScroll={true}
      >
        <ViewContainer>
          <SignupHeader
            processStage={YOUR_PROFILE}
            backgroundStyle={'light'}
            headerTitle={'YOUR PROFILE'}
          />
          <MainInformations />
          <AdditionalInformations />
          <PicturePicker />
          <Footer />
        </ViewContainer>
      </KeyboardAwareScrollView>
    );
  }
}

const initial = {
  enableMatching: false,
  description: '',
};

export default reduxForm({
  form: 'signup',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  initialValues: initial,
  onSubmit: validateUserInformations,
  onSubmitSuccess: (result, dispatch, props) => {
    dispatch(props.onSubmitSucceeded);
  },
})(UserInformation);
