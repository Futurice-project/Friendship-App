import React from 'react';
import { connect } from 'react-redux';
import rest from '../../utils/rest';
import { Description, Bold } from '../../components/Text';
import { ViewContainer, Padding, Centered } from '../../components/Layout';
import TextInput from '../../components/TextInput';
import RoundTab from '../../components/RoundTab';
import styled from 'styled-components/native';
import { NavigationActions } from 'react-navigation';
import { TouchableWithoutFeedback } from 'react-native';

import {
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Keyboard,
  View,
  Platform,
  Dimensions,
} from 'react-native';

/**
 * Maps the auth state from to the props of this component
 * The auth state contains the logging state
 * @param state
 */
const mapStateToProps = state => ({
  auth: state.auth,
  keyboardOpen: state.keyboardState ? state.keyboardState.keyboardOpen : false,
  keyboardKey: state.keyboardState ? state.keyboardState.keyboardKey : 'test',
});

// Map functions to props
const mapDispatchToProps = dispatch => ({
  /**
   * Call signIn action that tries logging in with the redux-api library
   * If it's successful we wil navigate to another page
   * Else we will log the errors
   * @param credentials
   */
  signIn: credentials => {
    dispatch(rest.actions.auth({}, { body: JSON.stringify(credentials) }))
      .then(() =>
        dispatch(
          NavigationActions.reset({
            index: 0, // active route = 0 (top of the stack)
            actions: [NavigationActions.navigate({ routeName: 'Tabs' })],
          }),
        ),
      )
      .catch(err => console.log(err));
  },
  /**
   * Navigates to the SignUpLocation screen
   */
  openSignUp: () =>
    dispatch(
      NavigationActions.navigate({
        routeName: 'SignUpLocation',
      }),
    ),
  /**
   * Navigates to the Welcome screen
   */
  openWelcomeScreen: () =>
    dispatch(
      NavigationActions.navigate({
        routeName: 'Welcome',
      }),
    ),
});

class SignInView extends React.Component {
  /**
   * Disable headers
   * @type {{title: string, header: (()=>null)}}
   */
  static navigationOptions = {
    title: 'Sign up',
    header: () => null,
  };

  state = {
    email: '',
    password: '',
    error: false,
    validationError: '',
    passwordSecure: true,
  };

  /**
   * After we try logging in trough or redux-api call
   * We want to render errors from the back-end accordingly
   * @returns {XML}
   */
  renderStatus() {
    if (this.state.validationError) {
      return (
        <Text style={styles.statusTextStyle}>{this.state.validationError}</Text>
      );
    }
    const { data, error, loading } = this.props.auth;
    let status = '';
    if (data.decoded) {
      status = `Signed in as ${data.decoded.email}`;
    }
    if (this.state.error && error) {
      if (this.state.email == '' || this.state.password == '') {
        status = 'Please enter an e-mail and password';
      } else {
        status = `${error.message}`;
      }
    }
    if (loading) {
      status = `Loading ...`;
    }

    return <Text style={styles.statusTextStyle}>{status}</Text>;
  }

  /**
   * Renders SignInButton
   * Changes position when keyboard is open and closed
   * @returns {XML}
   */
  renderSignInButton() {
    if (this.props.keyboardOpen) {
      return (
        <View
          onPress={() => this.signIn()}
          style={{ position: 'absolute', bottom: 0 }}
        >
          <RoundTab title="Sign In" onPress={() => this.signIn()} />
        </View>
      );
    }

    return (
      <View onPress={() => this.signIn()}>
        <RoundTab title="Sign In" onPress={() => this.signIn()} />
      </View>
    );
  }

  componentWillReceiveProps() {
    this.setState({ error: true });
  }

  /**
   * This function will create a validation error when
   * username or password are empty.
   * Else it will call the redux-api function which tries to sign in the user
   * based on the email and password that is set in the components state
   * @returns {*|SignInView}
   */
  signIn() {
    const { email, password } = this.state;
    if (!email || !password) {
      return this.setState({
        validationError: 'Please enter both email & password!',
      });
    }
    this.props.signIn({ email, password });
  }

  /**
   * This handler will be called when pressing the TouchableWithoutFeedback
   * This way we can handle clicks and close the keyboard accordingly
   * We want to close the keyboard when clicking anywhere but the sign in button
   */
  viewClickHandler = () => {
    if (this.props.keyboardOpen) {
      Keyboard.dismiss();
    }
  };

  /**
   * Render the component.
   * KeyboardShouldPersistTaps should be set to 'always' for the ViewContainer
   * this way the keyboard in this view will not dismiss automatically.
   * We handle the keyboard closing our own with a TouchableWithoutFeedback
   * which calls the viewClickHandler function
   *    - The keyboard will only close when pressing anywhere but the sign-in button
   * @returns {XML}
   */
  render() {
    return (
      <KeyboardAvoidingView
        behavior="padding"
        keyboardKey={this.props.keyboardKey}
      >
        <ViewContainer keyboardShouldPersistTaps="always">
          <TouchableWithoutFeedback onPress={this.viewClickHandler}>
            <Padding style={{ flex: 1 }}>
              <HeaderWrapper>
                <Text
                  style={styles.headerText}
                  onPress={this.props.openWelcomeScreen}
                >
                  Cancel
                </Text>
                <Text style={styles.headerText} onPress={this.props.openSignUp}>
                  Sign Up
                </Text>
              </HeaderWrapper>
              <Centered style={{ flex: 2 }}>
                <TextInput
                  titleColor="#f9f7f6"
                  title="EMAIL"
                  placeholder="HELLO@FRIENDSHIP.COM"
                  backColor="#faf6f0"
                  onChangeText={email =>
                    this.setState({ email, validationError: '', error: false })}
                  value={this.state.email}
                />
                <TextInput
                  secure={this.state.passwordSecure}
                  password
                  title="PASSWORD"
                  titleColor="#f9f7f6"
                  placeholder="*******"
                  backColor="#faf6f0"
                  showPassword={() =>
                    this.setState({
                      passwordSecure: !this.state.passwordSecure,
                    })}
                  onChangeText={password =>
                    this.setState({
                      password,
                      validationError: '',
                      error: false,
                    })}
                  value={this.state.password}
                />
                {this.renderStatus()}
                <Text style={styles.textStyle}>
                  Need help with your password?
                </Text>
              </Centered>
            </Padding>
          </TouchableWithoutFeedback>
          {this.renderSignInButton()}
        </ViewContainer>
      </KeyboardAvoidingView>
    );
  }
}

const HeaderWrapper = styled.View`
  margin-top: 20;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ContentWrapper = styled.View`flex: 1;`;

const styles = {
  headerText: {
    fontFamily: 'NunitoSans-SemiBold',
    fontSize: 20,
    color: '#ff8a65',
  },
  buttonTextStyle: {
    width: 230,
    height: 27,
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'NunitoSans-Regular',
    textAlign: 'center',
    color: 'white',
  },
  statusTextStyle: {
    fontFamily: 'NunitoSans-Regular',
    width: '100%',
    height: 20,
    fontSize: 15,
    textAlign: 'center',
    color: '#f673f7',
    marginBottom: 10,
  },
  textStyle: {
    fontFamily: 'NunitoSans-Regular',
    width: '100%',
    height: 20,
    fontSize: 15,
    textAlign: 'center',
    color: '#f9f7f6',
    marginBottom: 10,
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInView);
