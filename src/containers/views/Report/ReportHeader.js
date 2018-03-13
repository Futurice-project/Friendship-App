import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ReportHeader = ({ headerText, navigateBack }) => {
  const { viewContainer, textStyle } = styles;

  return (
    <View style={viewContainer}>
      <TouchableOpacity onPress={navigateBack}>
        <Icon
          style={{ padding: 15, fontSize: 26, textAlign: 'center' }}
          name={'ios-arrow-back'}
        />
      </TouchableOpacity>
      <Text style={textStyle}>{headerText}</Text>
      <Text>Cancel</Text>
    </View>
  );
};

const styles = {
  viewContainer: {
    backgroundColor: '#F8F8F8',
    paddingTop: 20,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#4a9b9b9b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    elevation: 10,
  },
  textStyle: {
    flex: 1,
    fontSize: 20,
    textAlign: 'center',
  },
};

export default ReportHeader;
