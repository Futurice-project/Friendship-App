import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Styles from './Layout';

const FeedbackListItem = ({ data }) => {
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
        <Text style={Styles.title}>{data.title}</Text>
        {data.subtitle && <Text style={Styles.text}>{data.subtitle}</Text>}
      </View>
      <Icon
        style={{ padding: 15, fontSize: 20, textAlign: 'center' }}
        name={'ios-arrow-forward'}
      />
    </View>
  );
};

export default FeedbackListItem;
