import React from 'react';
import { View } from 'react-native';

const Card = ({ children }) => {
  return <View style={styles.containerStyle}>{children}</View>;
};

const styles = {
  containerStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 20,
  },
};

export default Card;
