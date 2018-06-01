import React from 'react';
import { View } from 'react-native';

const CardSection = ({ children }) => {
  return <View style={styles.containerStyle}>{children}</View>;
};

const styles = {
  containerStyle: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 6,
    paddingBottom: 6,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderColor: '#ddd',
  },
};

export default CardSection;
