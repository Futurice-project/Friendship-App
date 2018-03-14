import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ReportHeader = ({ headerText, navigateBack, onCancel }) => {
  const { viewContainer, textStyle } = styles;

  return (
    <View style={viewContainer}>
      <TouchableOpacity onPress={navigateBack}>
        <Icon
          style={{ paddingLeft: 15, fontSize: 26, textAlign: 'center' }}
          name={'ios-arrow-back'}
        />
      </TouchableOpacity>
      <Text style={textStyle}>{headerText}</Text>
      {onCancel && ( // in "report success View, you dont have the cancel button design"
        <TouchableOpacity onPress={onCancel}>
          <Text
            style={{
              fontFamily: 'NunitoSans-Regular',
              fontSize: 15,
              color: '#bbbbbb',
              textDecorationLine: 'underline',
              marginRight: 10,
            }}
          >
            Cancel
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = {
  viewContainer: {
    backgroundColor: '#F8F8F8',
    paddingTop: 20,
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#d8d8d8',
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
