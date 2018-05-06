import React from 'react';
import { Text, Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';

const ButtonOption = styled.View`
  align-items: center;
  margin-top: 5px;
`;
// TODO delete useless style and import
// _hideModal, state.isModalVisible, _onPressButton, this.props.signOut()
const MyProfileModal = ({
  hideModal,
  isModalVisible,
  onPressButton,
  signOut,
  onFeedback,
}) => {
  return (
    <Modal
      backdropColor="#2a343c"
      backdropOpacity={0.96}
      isVisible={isModalVisible}
    >
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={hideModal}
          style={{
            alignSelf: 'flex-end',
            marginRight: -10,
            marginTop: 7,
          }}
        >
          <Image
            source={require('../../../assets/settingsIcon.png')}
            style={{
              width: 24,
              height: 24,
              tintColor: '#4A4A4A',
            }}
          />
        </TouchableOpacity>

        <ButtonOption>
          <TouchableOpacity onPress={onPressButton} style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>Privacy Settings</Text>
          </TouchableOpacity>
        </ButtonOption>

        <ButtonOption>
          <TouchableOpacity onPress={onFeedback} style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>Send Feedback</Text>
          </TouchableOpacity>
        </ButtonOption>

        <ButtonOption>
          <TouchableOpacity
            onPress={() => signOut()}
            style={styles.buttonStyle}
          >
            <Text
              style={[
                styles.buttonTextStyle,
                { fontFamily: 'NunitoSans-Bold' },
              ]}
            >
              Log Out
            </Text>
          </TouchableOpacity>
        </ButtonOption>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonTextStyle: {
    fontFamily: 'NunitoSans-Regular',
    alignSelf: 'center',
    fontSize: 20,
    color: '#faf6f0',
  },
});

export default MyProfileModal;
