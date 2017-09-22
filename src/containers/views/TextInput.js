import React from 'react';

import { Description, Bold } from '../../components/Text';
import { ViewContainer, Padding, Centered } from '../../components/Layout';
import TextInput from '../../components/TextInput';

export default class TextInputView extends React.Component {
  static navigationOptions = {
    title: 'TextInput',
  };
  state = {
    nickname: '',
    password: '',
  };
  renderDescription = () => (
    <Description>
      Here's a sample view using your <Bold>TextInput</Bold> component.
    </Description>
  );

  render = () => (
    <ViewContainer>
      <Centered>
        <Padding>
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
        </Padding>
      </Centered>
    </ViewContainer>
  );
}
