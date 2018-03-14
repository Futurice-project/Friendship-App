import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ReportHeader from './ReportHeader';

const ReportStatus = ({ navigateBack }) => {
  const { title, text } = styles;

  return (
    <View>
      <ReportHeader navigateBack={navigateBack} headerText="FEEDBACK" />
      <View style={{ padding: 30 }}>
        <Text style={[title, { marginBottom: 10 }]}>
          Thank you for your report.
        </Text>
        <Text style={[text, { marginBottom: 10 }]}>
          Your report helps keep Friendship app safe and fun for everyone. We
          will review your report, and reprimand the user if they are breaking
          community guidelines.
        </Text>
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

export default ReportStatus;
