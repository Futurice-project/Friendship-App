import React from 'react';
import { connect } from 'react-redux';
import rest from '../../utils/rest';
import Button from '../../components/Button';
import { Description, Bold } from '../../components/Text';
import { ViewContainer, Padding, Centered } from '../../components/Layout';
import TextInput from '../../components/TextInput';
import RoundTab from '../../components/RoundTab';
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
  signUp: credentials => {
    dispatch(
      rest.actions.users.post({}, { body: JSON.stringify(credentials) }),
    );
  },
  signOut: () => {
    dispatch({ type: 'SIGN_OUT' });
  },
});

class LoginView extends React.Component {
  static navigationOptions = {
    title: 'Login',
  };
  state = {
    email: '',
    password: '',
  };

  renderDescription = () => (
    <Description>
      Here's a sample view using your <Bold>TextInput</Bold> component.
    </Description>
  );

  renderStatus() {
    if (this.props.users.loading || this.props.auth.loading) {
      return <Text style={styles.textStyle}>Pending request</Text>;
    }
    if (this.props.users.error) {
      return (
        <Text style={styles.textStyle}>{this.props.users.error.message}</Text>
      );
    }
    if (this.props.auth.error) {
      return (
        <Text style={styles.textStyle}>{this.props.auth.error.message}</Text>
      );
    } else {
      return <Text style={styles.textStyle}>Need help with your password</Text>;
    }
  }

  signIn() {
    const { email, password } = this.state;
    this.props.signIn({ email, password });
  }

  signUp() {
    const { email, password } = this.state;
    this.props.signUp({ email, password });
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding">
        <ViewContainer>
          <Centered style={{ flex: 3 }}>
            <TextInput
              titleColor="#87df91"
              title="EMAIL"
              placeholder="HELLO@FRIENDSHIP.COM"
              backColor="#faf6f0"
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
            />
            <TextInput
              secure
              title="PASSWORD"
              titleColor="#87df91"
              placeholder="*******"
              backColor="#faf6f0"
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
            />
            {this.renderStatus()}
          </Centered>
          <RoundTab title="Done" style={{ flex: 1 }}>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => this.signIn()}
            >
              <Text style={styles.buttonTextStyle}>Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => this.signUp()}
            >
              <Text style={styles.buttonTextStyle}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => this.props.signOut()}
            >
              <Text style={styles.buttonTextStyle}>Sign Out</Text>
            </TouchableOpacity>
          </RoundTab>
        </ViewContainer>
      </KeyboardAvoidingView>
    );
  }
}

const styles = {
  buttonStyle: {
    bottom: 0,
    alignItems: 'center',
    marginBottom: 5,
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
    width: 205,
    height: 20,
    fontSize: 14,
    textAlign: 'center',
    color: '#87df91',
    marginBottom: 10,
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
