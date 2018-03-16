import React from 'react';
import { View, Text, TouchableOpacity, TextInput as Input } from 'react-native';

export default class SurveyQuestion extends React.Component {
  render() {
    const { title, subtitle, onChange, value } = this.props;
    return (
      <View style={{ marginLeft: 20, marginBottom: 20 }}>
        <Text style={[styles.surveyTitle, { marginBottom: 10 }]}>{title}</Text>
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          placeholder={subtitle}
          multiline={true}
          style={styles.feedbackInput}
          onChangeText={text => onChange(text)}
          value={value}
        />
      </View>
    );
  }
}

const styles = {
  feedbackInput: {
    height: 150,
    backgroundColor: '#e8e9e8',
    borderRadius: 33,
    marginTop: 4,
    marginRight: 20,
    paddingRight: 40,
    paddingLeft: 40,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 14,
    lineHeight: 18,
    fontFamily: 'NunitoSans-Regular',
    textAlignVertical: 'top',
  },
  surveyTitle: {
    marginLeft: 10,
    color: '#4a4a4a',
    fontSize: 12,
    marginBottom: 10,
    fontFamily: 'NunitoSans-Bold',
  },
};
