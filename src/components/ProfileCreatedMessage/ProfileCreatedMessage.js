import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../Button/Button';

class ProfileCreatedMessage extends Component {
  render() {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Icon name="md-checkmark-circle" size={60} color="green" />
        <Text>Thank you for registering !</Text>
        <Button text="Next" width="sm" />
      </View>
    );
  }
}

ProfileCreatedMessage.propTypes = {};

export default ProfileCreatedMessage;
