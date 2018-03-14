import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FeedbackHeader from './FeedbackHeader';

const FeedbackStatus = ({ navigateBack, data }) => {
  const { title, text } = styles;

  return (
    <View>
      <FeedbackHeader navigateBack={navigateBack} headerText="FEEDBACK" />
      <View style={{ padding: 30 }}>
        <Text style={[title, { marginBottom: 10 }]}>{data.title}</Text>
        <Text style={[text, { marginBottom: 10 }]}>{data.subtitle}</Text>
      </View>
    </View>
  );
};

const styles = {
  title: {
    fontFamily: 'NunitoSans-Bold',
    fontSize: 15,
    color: '#4a4a4a',
  },
  text: {
    color: '#949795',
    fontFamily: 'NunitoSans-Regular',
    fontSize: 13,
  },
};

export default FeedbackStatus;
