import React from 'react';
import { Text, Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

const ButtonOption = styled.View`
  align-items: center;
  margin-top: 5px;
`;
// TODO delete useless style and import
// _hideModal, state.isModalVisible, _onPressButton, this.props.signOut()
const mapDispatchToProps = dispatch => ({
  openEditForm: eventDetails =>
    dispatch(
      NavigationActions.navigate({
        routeName: 'EventEditView',
        params: { eventDetails },
      }),
    ),
});

const MyEventModal = ({
  hideModal,
  isModalVisible,
  deleteEvent,
  eventDetails,
  openEditForm,
}) => {
  const openEventEditForm = eventDetails => {
    hideModal();
    openEditForm(eventDetails);
  };

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
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => openEventEditForm(eventDetails)}
          >
            <Text style={styles.buttonTextStyle}>Edit</Text>
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

export default connect(null, mapDispatchToProps)(MyEventModal);
