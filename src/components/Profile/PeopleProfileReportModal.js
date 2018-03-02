import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import Button from '../../components/Button';
import Modal from 'react-native-modal';

const PeopleProfileReportModal = ({
  fn_reportDescription,
  reportDescription,
  reportTitle,
  isReportVisible,
  showReport,
  sendReport,
}) => {
  return (
    <Modal visible={isReportVisible} transparent animationType="slide">
      <View
        style={{
          height: 350,
          borderRadius: 5,
          backgroundColor: '#F1F1F3',
          padding: 20,
          paddingLeft: 10,
        }}
      >
        <View
          style={{
            marginLeft: 10,
            borderBottomWidth: 0.8,
            borderBottomColor: 'gray',
            marginBottom: 20,
            paddingBottom: 20,
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              fontWeight: 'bold',
              paddingBottom: 15,
              borderBottomColor: 'gray',
              borderBottomWidth: 0.8,
            }}
          >
            {reportTitle}
          </Text>
          <Text style={{ marginTop: 10, fontSize: 16, color: '#60686d' }}>
            Report Title
          </Text>
          <TextInput style={styles.reportInput} />
          <Text style={{ marginTop: 10, fontSize: 16, color: '#60686d' }}>
            Report Description
          </Text>
          <TextInput
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Description"
            multiline={true}
            onChangeText={fn_reportDescription}
            value={reportDescription}
            style={styles.reportInput}
          />
          <Text style={{ marginTop: 5, color: '#60686d' }}>
            *Average response time is 2 days{' '}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <TouchableOpacity
            title="Cancel"
            onPress={showReport}
            style={styles.cancelButton}
          >
            <Text
              style={{
                color: '#F9F1EF',
                fontSize: 16,
                fontWeight: '600',
              }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            title="Report"
            onPress={sendReport}
            style={styles.reportButton}
          >
            <Text
              style={{
                color: '#F9F1EF',
                fontSize: 16,
                fontWeight: '600',
              }}
            >
              Report
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = {
  reportInput: {
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderWidth: 0.5,
    borderTopWidth: 0.5,
    borderRadius: 8,
    height: 40,
    borderBottomColor: 'grey',
    borderTopColor: 'grey',
    borderLeftColor: 'grey',
    borderRightColor: 'grey',
    marginLeft: 2,
    marginTop: 5,
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
  },
  reportButton: {
    backgroundColor: '#00bfff',
    borderRadius: 5,
    borderWidth: 1,
    padding: 13,
    borderColor: '#14B28B',
    marginLeft: 5,
  },
  cancelButton: {
    backgroundColor: '#ed5249',
    borderRadius: 5,
    borderWidth: 1,
    padding: 13,
    borderColor: '#14B28B',
  },
};

export default PeopleProfileReportModal;
