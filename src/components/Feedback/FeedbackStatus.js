import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FeedbackHeader from './FeedbackHeader';
import Styles from './Layout';

const FeedbackStatus = ({ navigateBack, data }) => {
  const { title, text } = Styles;

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

export default FeedbackStatus;
