import React from 'react';

import { Description, Bold } from '../../components/Text';
import { ViewContainer, Padding, Centered } from '../../components/Layout';
import TextInput from '../../components/TextInput';
import RoundTab from '../../components/RoundTab';
import { TouchableOpacity, Text, KeyboardAvoidingView } from 'react-native';

export default class TextInputView extends React.Component {
  static navigationOptions = {
    title: 'TextInput',
  };
  state = {
    nickname: '',
    password: '',
  };
  _handlePress() {
    console.log('Pressed!');
  }
  render = () => (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ViewContainer>
        <Centered>
          <TextInput
            titleColor="#87df91"
            title="EMAIL"
            placeholder="HELLO@FRIENDSHIP.COM"
            backColor="#faf6f0"
            onChangeText={nickname => this.setState({ nickname })}
            value={this.state.nickname}
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
          <Text style={styles.textStyle}>NEED HELP WITH YOUR PASSWORD?</Text>
        </Centered>
        <RoundTab>
          <TouchableOpacity
            style={styles.buttonStyle}
            //TODO set the press function
            onPress={() => this._handlePress()}
          >
            <Text style={styles.buttonTextStyle}>Done</Text>
          </TouchableOpacity>
        </RoundTab>
      </ViewContainer>
    </KeyboardAvoidingView>
  );
}
const styles = {
  buttonStyle: {
    bottom: 0,
    alignItems: 'center',
  },
  buttonTextStyle: {
    width: 230,
    height: 27,
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'NunitoSans-Regular',
    textAlign: 'center',
    color: '#2d4359',
  },
  textStyle: {
    width: 205,
    height: 20,
    fontSize: 14,
    fontFamily: 'Futurice',
    textAlign: 'center',
    color: '#87df91',
    marginBottom: 10,
  },
};
