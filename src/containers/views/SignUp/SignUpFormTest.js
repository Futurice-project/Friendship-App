import React from 'react';
import { Alert } from 'react-native';
import { connect } from 'react-redux';

import rest from '../../../utils/rest';
import {
  incrementProgress,
  resetProgress,
  UPDATE_VALIDATION_ERROR,
  updateUserInfos,
} from '../../../state/signup';
import UserInfosForm from '../../../components/SignUp/UserInfosForm';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ViewContainer } from '../../../components/Layout/Layout';

const mapStateToProps = state => ({
  auth: state.auth,
  signup: state.signup,
});

const mapDispatchToProps = dispatch => ({
  signUp: formData => {
    dispatch(
      rest.actions.register(
        {},
        { body: formData, headers: { 'Content-Type': 'multipart/form-data' } },
      ),
    );
  },
  resetProgressBar: () => dispatch(resetProgress()),
  incProgress: () => dispatch(incrementProgress()),
  updateUserInfos: (credentials, actionType) =>
    dispatch(updateUserInfos(credentials, actionType)),
});

class SignUpView extends React.Component {
  componentWillMount() {
    this.props.resetProgressBar();
  }

  renderStatus() {
    if (this.props.signup.userInfos.validationError) {
      return Alert.alert(
        'Validation Error',
        this.props.signup.userInfos.validationError,
        [
          {
            text: 'OK',
            onPress: () =>
              this.props.updateUserInfos('', UPDATE_VALIDATION_ERROR),
          },
        ],
        { cancelable: false },
      );
    }
    /*if (this.props.auth.error) {
      return Alert.alert(
        'Error',
        this.props.auth.error.message,
        [{text: 'OK', onPress: () => {
          console.log(this.props.auth.error);
          }}],
        {cancelable: false},
      );
    }*/
  }

  render() {
    //this.renderStatus();
    return (
      <KeyboardAwareScrollView
        extraHeight={30}
        enableResetScrollToCoords={false}
        enableOnAndroid={true}
        enableAutoAutomaticScroll={true}
      >
        <ViewContainer>
          <UserInfosForm />
        </ViewContainer>
      </KeyboardAwareScrollView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpView);
