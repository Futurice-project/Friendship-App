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
import submit from '../../../components/SignUp/validate';
import { NavigationActions } from 'react-navigation';

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

export default reduxForm({
  form: 'signup',
  onSubmit: submit,
  onSubmitSuccess: (result, dispatch, props) => {
    dispatch(NavigationActions.navigate({ routeName: 'SignUpLocation' }));
  },
})(UserInformation);
