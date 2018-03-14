import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const FeedbackList = ({ data }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingTop: 7,
        paddingBottom: 7,
        borderBottomWidth: 1,
        borderBottomColor: '#d4d6d5',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <View style={{ marginLeft: 20, flex: 1, flexWrap: 'wrap' }}>
        <Text
          style={{
            color: '#4a4a4a',
            fontSize: 15,
            fontFamily: 'NunitoSans-Bold',
          }}
        >
          {data.title}
        </Text>
        {data.subtitle && (
          <Text
            style={{
              color: '#949795',
              fontFamily: 'NunitoSans-Regular',
              fontSize: 13,
            }}
          >
            {data.subtitle}
          </Text>
        )}
      </View>
      <Icon
        style={{ padding: 15, fontSize: 20, textAlign: 'center' }}
        name={'ios-arrow-forward'}
      />
    </View>
  );
};

export default FeedbackList;
