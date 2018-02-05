import React from 'react';
import { View } from 'react-native';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import Modal from 'react-native-modal';

const PeopleProfileModal = ({
  fn_reportDescription,
  reportDescription,
  reportTitle,
  isReportVisible,
  showReport,
  sendReport,
}) => {
  return (
    <Modal
      visible={isReportVisible}
      animationIn="slideInUp"
      animationInTiming={200}
    >
      <View
        style={{
          height: 200,
          backgroundColor: '#eee',
          borderRadius: 10,
          paddingVertical: 10,
        }}
      >
        <TextInput
          autoCorrect={false}
          autoCapitalize="none"
          titleColor="#2d4359"
          title={reportTitle}
          placeholder="Description"
          backColor="#faf6f0"
          onChangeText={fn_reportDescription}
          value={reportDescription}
        />
        <View style={{ flexDirection: 'row' }}>
          <Button
            title="Cancel"
            primary
            textColor="green"
            size="half"
            color="light"
            onPress={showReport}
          />
          <Button
            title="Report"
            border
            textColor="black"
            size="half"
            color="dark"
            onPress={sendReport}
          />
        </View>
      </View>
    </Modal>
  );
};

export default PeopleProfileModal;
