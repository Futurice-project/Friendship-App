import React from 'react';
import { connect } from 'react-redux';
import rest from '../../utils/rest';

import { Description, Bold } from '../../components/Text';
import {
  PersonalityContainer,
  Padding,
  Centered,
} from '../../components/Layout';
import TextInput from '../../components/TextInput';
import RoundTab from '../../components/RoundTab';
import { TouchableOpacity, Text, KeyboardAvoidingView } from 'react-native';

class PersonalityView extends React.Component {
  static navigationOptions = {
    title: 'Personality',
  };

  render() {
    return (
      <PersonalityContainer>
        <Text>aaa</Text>
      </PersonalityContainer>
    );
  }
}

export default connect(undefined)(PersonalityView);
