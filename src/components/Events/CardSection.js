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
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative',
  },
};

export default CardSection;
