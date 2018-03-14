import React from 'react';
import { View, Text, TouchableOpacity, TextInput as Input } from 'react-native';
import TextInput from '../TextInput';

import Icon from 'react-native-vector-icons/Ionicons';
import FeedbackHeader from './FeedbackHeader';

const FeedbackContent = ({
  data,
  navigateBack,
  sendReport,
  onChange,
  onCancel,
}) => {
  const { title, text, feedbackInput, interestInput } = styles;
  if (data.content.title === 'Send us an idea') {
    // if the user chooses "i just dont like it" category
    return (
      <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <FeedbackHeader
          navigateBack={navigateBack}
          headerText="Feedback"
          onCancel={onCancel}
        />
        <View style={{ padding: 30 }}>
          <Text style={[title, { marginBottom: 20 }]}>
            {data.content.title}
          </Text>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder={data.content.subtitle}
            multiline={true}
            onChangeText={text => onChange(text)}
            style={feedbackInput}
          />
        </View>
        <View style={{ marginTop: 40, alignItems: 'center' }}>
          <TouchableOpacity
            onPress={sendReport}
            style={{
              padding: 13,
              width: 200,
              backgroundColor: '#2d4359',
              alignItems: 'center',
              borderRadius: 34,
            }}
          >
            <Text
              style={{
                fontFamily: 'NunitoSans-SemiBold',
                alignSelf: 'center',
                color: '#faf5f0',
                fontSize: 16,
              }}
            >
              Send feedback
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  if (data.content.title === 'Suggest an interest' || 'Suggest an activity') {
    return (
      <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <FeedbackHeader
          navigateBack={navigateBack}
          headerText="Feedback"
          onCancel={onCancel}
        />
        <View style={{ padding: 30 }}>
          <Text style={[title, { marginBottom: 20 }]}>
            {data.content.title}
          </Text>
          <Text style={[text, { marginBottom: 10 }]}>
            {data.content.subtitle}
          </Text>
          <TextInput
            autoCorrect={false}
            autoCapitalize="none"
            placeholder={data.content.placeholder}
            placeholderTextColor="#3b3b3d"
            multiline={true}
            onChangeText={text => onChange(text)}
            style={interestInput}
          />
        </View>
        <View style={{ marginTop: 40, alignItems: 'center' }}>
          <TouchableOpacity
            onPress={sendReport}
            style={{
              padding: 13,
              width: 200,
              backgroundColor: '#2d4359',
              alignItems: 'center',
              borderRadius: 34,
            }}
          >
            <Text
              style={{
                fontFamily: 'NunitoSans-SemiBold',
                alignSelf: 'center',
                color: '#faf5f0',
                fontSize: 16,
              }}
            >
              Send suggestion
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <FeedbackHeader
        navigateBack={navigateBack}
        headerText="Feedback"
        onCancel={onCancel}
      />
      <View style={{ padding: 30 }}>
        <Text style={[title, { marginBottom: 10 }]}>{data.content.title}</Text>
        <Text style={[text, { marginBottom: 10 }]}>
          {data.content.subtitle}
        </Text>
        <Text style={text}>{data.content.reasonTitle}</Text>
        {data.content.reasons.map((item, i) => (
          <Text style={text} key={i}>
            {item}
          </Text>
        ))}
        <Text style={[text, { marginTop: 30 }]}>
          {data.content.confidential}
        </Text>
      </View>
      <View style={{ marginTop: 40, alignItems: 'center' }}>
        <TouchableOpacity
          onPress={sendReport}
          style={{
            padding: 13,
            width: 200,
            backgroundColor: '#ed7a5f',
            alignItems: 'center',
            borderRadius: 34,
          }}
        >
          <Text style={{ alignSelf: 'center', color: '#faf5f0', fontSize: 16 }}>
            Report
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginTop: 10,
            padding: 13,
            width: 200,
            alignItems: 'center',
            borderRadius: 34,
            borderWidth: 2,
            borderColor: '#2d4359',
          }}
        >
          <Text style={{ alignSelf: 'center', color: '#2d4359', fontSize: 16 }}>
            Block
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  title: {
    fontFamily: 'NunitoSans-Bold',
    fontSize: 15,
    color: '#4a4a4a',
  },
  feedbackInput: {
    height: 150,
    backgroundColor: '#e8e9e8',
    borderRadius: 33,
    marginLeft: 2,
    marginTop: 4,
    paddingRight: 30,
    paddingLeft: 30,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 14,
    lineHeight: 18,
    fontFamily: 'NunitoSans-Regular',
    textAlignVertical: 'top',
  },
  interestInput: {
    height: 40,
    backgroundColor: '#e8e9e8',
    borderRadius: 33,
    marginLeft: 2,
    marginTop: 4,
    paddingRight: 30,
    paddingLeft: 30,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 14,
    color: '#2d4359',
    letterSpacing: 1.47,
    fontFamily: 'NunitoSans-LightItalic',
    textAlignVertical: 'top',
  },
  text: {
    color: '#949795',
    fontFamily: 'NunitoSans-Regular',
    fontSize: 13,
  },
};
export default FeedbackContent;
