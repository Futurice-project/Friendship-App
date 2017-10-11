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
  View,
} from 'react-native';

const mapStateToProps = state => ({
  auth: state.auth,
  users: state.users,
});

const mapDispatchToProps = dispatch => ({
  signIn: credentials => {
    dispatch(rest.actions.auth({}, { body: JSON.stringify(credentials) }));
  },
  openSignUp: () =>
    dispatch(
      NavigationActions.navigate({
        routeName: 'SignIn',
      }),
    ),
  openWelcomeScreen: () =>
    dispatch(
      NavigationActions.navigate({
        routeName: 'Welcome',
      }),
    ),
});

class LoginView extends React.Component {
  static navigationOptions = {
    title: 'Sign up',
    header: () => null,
  };

  state = {
    email: '',
    password: '',
  };

  renderStatus() {
    if (this.props.auth.loading) {
      return <Text style={styles.textStyle}>Pending request</Text>;
    }

    if (this.props.auth.error) {
      return (
        <Text style={styles.textStyle}>{this.props.auth.error.message}</Text>
      );
    }

    return <Text style={styles.textStyle}> Success </Text>;
  }

  signIn() {
    const { email, password } = this.state;
    this.props.signIn({ email, password });
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding">
        <ViewContainer>
          <Padding style={{ flex: 1 }}>
            <HeaderWrapper>
              <Text
                style={styles.headerText}
                onpress={this.props.openWelcomeScreen}
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
              {this.renderStatus()}
            </Centered>
          </Padding>
          <TouchableOpacity onPress={() => this.signIn()}>
            <RoundTab title="Sign In" style={{ flex: 1 }} />
          </TouchableOpacity>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
