import React, { Component } from 'react';
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
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  signOut: () => {
    dispatch({ type: 'SIGN_OUT' });
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

class SignOutView extends Component {
  static navigationOptions = {
    title: 'Sign Out',
    header: () => null,
  };

  state = {
    email: '',
    password: '',
  };

  renderStatus() {
    if (this.props.auth.data.decoded) {
      const email = this.props.auth.data.decoded.email;
      return <Text style={styles.textStyle}>Signed in as {email}</Text>;
    }
    return <Text style={styles.textStyle}>Not signed in!!</Text>;
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
            </HeaderWrapper>
            <Centered style={{ flex: 2 }}>
              {this.renderStatus()}
              <Text style={styles.headerText} onPress={this.props.signOut}>
                Sign Out
              </Text>
            </Centered>
          </Padding>
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
    height: 60,
    fontSize: 15,
    textAlign: 'center',
    color: '#f673f8',
    marginBottom: 10,
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(SignOutView);
