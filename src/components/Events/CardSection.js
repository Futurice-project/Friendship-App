import React from 'react';
import { View } from 'react-native';

const CardSection = ({ children }) => {
  return <View style={styles.containerStyle}>{children}</View>;
};

const styles = {
  containerStyle: {
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative',
  },
};

export default CardSection;
