import React from 'react';

import { Description, Bold } from '../../components/Text';
import { ViewContainer, Padding, Centered } from '../../components/Layout';
import TextInput from '../../components/TextInput';

export default class TextInputView extends React.Component {
  static navigationOptions = {
    title: 'TextInput',
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
          <TextInput placeholder="E-mail" hint="Visible" backColor="#faf6f0" />
          <TextInput
            secure
            placeholder="Password"
            hint="Visible"
            backColor="#faf6f0"
          />
        </Padding>
      </Centered>
      {this.renderDescription()}
    </ViewContainer>
  );
}
