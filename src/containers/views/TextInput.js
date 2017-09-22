import React from 'react';

import { Description, Bold } from '../../components/Text';
import { ViewContainer, Padding, Centered } from '../../components/Layout';
import TextInput from '../../components/TextInput';
import RoundTab from '../../components/RoundTab';
import { TouchableOpacity, Text } from 'react-native';

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
  renderDescription = () => (
    <Description>
      Here's a sample view using your <Bold>TextInput</Bold> component.
    </Description>
  );

  render = () => (
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
        <Text style={styles.textStyle}>Need help with your password?</Text>
      </Centered>
      <RoundTab>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => this._handlePress()}
        >
          <Text style={styles.buttonTextStyle}>Submit</Text>
        </TouchableOpacity>
      </RoundTab>
    </ViewContainer>
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
    textAlign: 'center',
    color: '#2d4359',
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
