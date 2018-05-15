import React from 'react';
import { TouchableOpacity, View } from 'react-native';

const Card = ({ children, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.containerStyle}>
      {children}
    </TouchableOpacity>
  );
};

const styles = {
  containerStyle: {
    display: 'flex',
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
