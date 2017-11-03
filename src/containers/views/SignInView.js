import React from 'react';
import { connect } from 'react-redux';
import rest from '../../utils/rest';
import Button from '../../components/Button';
import { Description, Bold } from '../../components/Text';
import { ViewContainer, Padding, Centered } from '../../components/Layout';
import TextInput from '../../components/TextInput';
import RoundTab from '../../components/RoundTab';
import styled from 'styled-components/native';
import { NavigationActions } from 'react-navigation';

import {
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Keyboard,
  View,
  Platform,
  Dimensions,
} from 'react-native';

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  signIn: credentials => {
    dispatch(rest.actions.auth({}, { body: JSON.stringify(credentials) }))
      .then(() =>
        dispatch(
          NavigationActions.navigate({
            routeName: 'SignOut',
          }),
        ),
      )
      .catch(err => console.log(err));
  },
  openSignUp: () =>
    dispatch(
      NavigationActions.navigate({
        routeName: 'SignUp',
      }),
    ),
  openWelcomeScreen: () =>
    dispatch(
      NavigationActions.navigate({
        routeName: 'Welcome',
      }),
    ),
});

class SignInView extends React.Component {
  static navigationOptions = {
    title: 'Sign up',
    header: () => null,
  };

  // Creates a new key everytime there is a change on the keyboard
  // This will solve the white space after opening textfields
  // Because now it recognizes a change (key = different)
  keyboardHideListener = () => {
    this.setState({
      keyboardAvoidingViewKey: new Date().getTime(),
      keyboardOpen: false,
    });
  };

  keyboardDidShowListener = e => {
    console.log(e.endCoordinates.height);
    this.setState({
      keyboardOpen: true,
      keyboardHeight: e.endCoordinates.height,
    });
  };

  componentDidMount() {
    this.keyboardHideListener = Keyboard.addListener(
      Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide',
      this.keyboardHideListener,
    );
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShowListener,
    );
  }

  componentWillUnmount() {
    this.keyboardHideListener.remove();
    this.keyboardDidShowListener.remove();
  }

  state = {
    email: '',
    password: '',
    error: false,
    validationError: '',
    keyboardAvoidingViewKey: 'keyboardAvoidingViewKey',
    keyboardOpen: false,
    keyboardHeight: '',
  };

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
    if (this.state.keyboardOpen) {
      return (
        <View onPress={() => this.signIn()} style={{ marginBottom: 0 }}>
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

  signIn() {
    const { email, password } = this.state;
    if (!email || !password) {
      return this.setState({
        validationError: 'Please enter both email & password!',
      });
    }
    this.props.signIn({ email, password });
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior="padding"
        key={this.state.keyboardAvoidingViewKey}
      >
        <ViewContainer>
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
                secure
                title="PASSWORD"
                titleColor="#f9f7f6"
                placeholder="*******"
                backColor="#faf6f0"
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
