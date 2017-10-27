import React from 'react';
import { connect } from 'react-redux';
import rest from '../../utils/rest';
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
  users: state.users,
});

const mapDispatchToProps = dispatch => ({
  signUp: credentials => {
    dispatch(
      rest.actions.users.post({}, { body: JSON.stringify(credentials) }),
    );
  },
  openSignIn: () =>
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

class SignUpView extends React.Component {
  componentWillReceiveProps() {
    this.setState({ error: true });
  }

  static navigationOptions = {
    title: 'Sign up',
    header: () => null,
  };

  state = {
    email: 'qhieu45@gmail.com',
    password: '123456',
    error: false,
  };

  renderStatus() {
    const { data, error, loading } = this.props.users;
    let status = '';
    if (data.email) {
      status = `Email ${data.email} successfully signed up!`;
    }
    if (this.state.error && error) {
      status = `Error ${error.statusCode}: ${error.message}`;
    }
    if (loading) {
      status = `Loading ...`;
    }

    return <Text style={styles.textStyle}>{status}</Text>;
  }

  signUp() {
    const { email, password } = this.state;
    this.props.signUp({ email, password });
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding">
        <ViewContainer>
          <Padding style={{ flex: 1 }}>
            <HeaderWrapper>
              <Text
                style={styles.headerText}
                onPress={this.props.openWelcomeScreen}
              >
                Cancel
              </Text>
              <Text style={styles.headerText} onPress={this.props.openSignIn}>
                Sign In
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
          <TouchableOpacity onPress={() => this.signUp()}>
            <RoundTab
              title="Sign Up"
              style={{ flex: 1 }}
              onPress={() => this.signUp()}
            />
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
    height: 40,
    fontSize: 15,
    textAlign: 'center',
    color: '#f673f8',
    marginBottom: 10,
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpView);
