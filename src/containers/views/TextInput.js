import React from 'react';
import { connect } from 'react-redux';
import rest from '../../utils/rest';

import { Description, Bold } from '../../components/Text';
import { ViewContainer, Padding, Centered } from '../../components/Layout';
import TextInput from '../../components/TextInput';
import RoundTab from '../../components/RoundTab';
import { TouchableOpacity, Text, KeyboardAvoidingView } from 'react-native';

const mapStateToProps = state => ({
  // users: state.users,
  // usersLoading: state.users.loading,
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
});

class TextInputView extends React.Component {
  static navigationOptions = {
    title: 'TextInput',
  };
  state = {
    email: '',
    password: '',
  };
  _handlePress() {
    console.log('Pressed!');
  }
  renderDescription = () => (
    <Description>
      Here's a sample view using your <Bold>TextInput</Bold> component.
    </Description>
  );

  renderStatus() {
    // render method to show status & data to user here?
    if (this.props.auth.error) {
      return <Text style={styles.textStyle}>Error!!!</Text>;
    }
    if (!this.props.auth.error) {
      return <Text style={styles.textStyle}>Logging In successfully!!</Text>;
    }

    // need new logic to render error when signing up also
  }

  signIn() {
    const { email, password } = this.state;
    this.props.signIn({ email, password });
    // console.log(this.props.auth);
  }

  signUp() {
    const { email, password } = this.state;
    this.props.signUp({ email, password });
  }

  render() {
    // console.log(this.props);
    const { auth } = this.props;

    return (
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <ViewContainer>
          <Centered>
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
            {/* <Text style={styles.textStyle}>{this.state.status}</Text> */}
            {this.renderStatus()}
          </Centered>
          <RoundTab>
            <TouchableOpacity
              style={styles.buttonStyle}
              //TODO set the press function
              onPress={() => this.signIn()}
            >
              <Text style={styles.buttonTextStyle}>Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonStyle}
              //TODO set the press function
              onPress={() => this.signUp()}
            >
              <Text style={styles.buttonTextStyle}>Sign Up</Text>
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
    // fontFamily: 'Futurice',
    textAlign: 'center',
    color: '#87df91',
    marginBottom: 10,
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(TextInputView);
