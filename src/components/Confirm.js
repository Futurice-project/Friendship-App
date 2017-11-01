import _ from 'lodash';
import React, { Component } from 'react';
import { Text, View, Modal, Button } from 'react-native';

const Confirm = ({ children, visible, onAccept, onDecline }) => {
  const { containerStyle, textStyle, cardSectionStyle } = styles;

  return (
    <Modal
      animationType="slide"
      transparent
      visible={props.visible}
      onRequestClose={() => {
        alert('Modal has been closed.');
      }}
    >
      <View>
        <View>
          <Text>HELLOO</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = {
  cardSectionStyle: {
    justifyContent: 'center',
  },
  textStyle: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40,
  },
  containerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
  },
};

export default { Confirm };
