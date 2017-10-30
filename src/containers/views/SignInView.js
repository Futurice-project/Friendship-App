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
    this.setState({ keyboardAvoidingViewKey: new Date().getTime() });
  };

  componentDidMount() {
    this.keyboardHideListener = Keyboard.addListener(
      Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide',
      this.keyboardHideListener,
    );
  }

  componentWillUnmount() {
    this.keyboardHideListener.remove();
  }

  state = {
    email: '',
    password: '',
    error: false,
    keyboardAvoidingViewKey: 'keyboardAvoidingViewKey',
  };

  renderStatus() {
    const { data, error, loading } = this.props.auth;
    let status = '';
    if (data.decoded) {
      status = `Signed in as ${data.decoded.email}`;
    }
    if (this.state.error && error) {
      status = `Error ${error.statusCode}: ${error.message}`;
    }
    if (loading) {
      status = `Loading ...`;
    }

    return <Text style={styles.textStyle}>{status}</Text>;
  }

  componentWillReceiveProps() {
    this.setState({ error: true });
  }

  signIn() {
    const { email, password } = this.state;
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
            <Text style={{ color: 'white' }}>Sign In</Text>
            {/*<Centered style={{ flex: 2 }}>*/}
            <TextInput
              titleColor="#f9f7f6"
              title="EMAIL"
              placeholder="HELLO@FRIENDSHIP.COM"
              backColor="#faf6f0"
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
            />
            <TextInput
              secure
              title="PASSWORD"
              titleColor="#f9f7f6"
              placeholder="*******"
              backColor="#faf6f0"
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
            />
            <TextInput
              secure
              title="PASSWORD"
              titleColor="#f9f7f6"
              placeholder="*******"
              backColor="#faf6f0"
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
            />
            <TextInput
              secure
              title="PASSWORD"
              titleColor="#f9f7f6"
              placeholder="*******"
              backColor="#faf6f0"
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
            />
            <TextInput
              secure
              title="PASSWORD"
              titleColor="#f9f7f6"
              placeholder="*******"
              backColor="#faf6f0"
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
            />
            <TextInput
              secure
              title="PASSWORD"
              titleColor="#f9f7f6"
              placeholder="*******"
              backColor="#faf6f0"
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
            />
            <TextInput
              secure
              title="PASSWORD"
              titleColor="#f9f7f6"
              placeholder="*******"
              backColor="#faf6f0"
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
            />
            <TextInput
              secure
              title="PASSWORD"
              titleColor="#f9f7f6"
              placeholder="*******"
              backColor="#faf6f0"
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
            />

            {this.renderStatus()}
            {/*</Centered>*/}
          </Padding>
          <RoundTab
            title="Sign In"
            style={{ flex: 1 }}
            onPress={() => this.signIn()}
          />
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
  textStyle: {
    fontFamily: 'NunitoSans-Regular',
    width: 205,
    height: 20,
    fontSize: 15,
    textAlign: 'center',
    color: '#f673f8',
    marginBottom: 10,
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInView);
