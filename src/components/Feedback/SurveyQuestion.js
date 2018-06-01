import React from 'react';
import { View, Text, TouchableOpacity, TextInput as Input } from 'react-native';
import Styles from './Layout';

export default class SurveyQuestion extends React.Component {
  render() {
    const { title, subtitle, onChange, value } = this.props;
    return (
      <View style={{ marginLeft: 20, marginBottom: 20 }}>
        <Text style={[Styles.surveyTitle, { marginBottom: 10 }]}>{title}</Text>
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          placeholder={subtitle}
          multiline={true}
          style={[Styles.feedbackInput, { marginRight: 30 }]}
          onChangeText={text => onChange(text)}
          value={value}
        />
      </View>
    );
  }
}
