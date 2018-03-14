import React from 'react';
import { View, Text, TouchableOpacity, TextInput as Input } from 'react-native';
import TextInput from '../TextInput';
import { CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import FeedbackHeader from './FeedbackHeader';
import { Slider } from 'react-native-elements';
const FeedbackContent = ({
  data,
  navigateBack,
  sendReport,
  onChange,
  onCancel,
}) => {
  const {
    title,
    text,
    feedbackInput,
    interestInput,
    surveyTitle,
    surveyText,
  } = styles;
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
  if (
    data.content.title === 'Suggest an interest' ||
    data.content.title === 'Suggest an activity'
  ) {
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
        <Text style={[title, { marginBottom: 10 }]}>
          Feedback for Friendship app
        </Text>
        <Text style={[text]}>
          Thank you for taking the time to help us make the app better!
        </Text>
      </View>
      <View
        style={{
          marginBottom: 10,
          alignItems: 'stretch',
        }}
      >
        <Text style={surveyTitle}>How would you rate the app?</Text>
        <Slider
          style={{
            marginLeft: 30,
            marginRight: 30,
          }}
          thumbStyle={{
            width: 30,
            height: 30,
            borderRadius: 30,
          }}
          trackStyle={{ height: 10, borderRadius: 27 }}
          minimumTrackTintColor="#839297"
          maximumTrackTintColor="#e8e9e8"
          thumbTintColor="#839297"
          value={0.2}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: 33,
            marginRight: 33,
          }}
        >
          <Text style={surveyText}>Naah...</Text>
          <Text style={surveyText}>Meh.</Text>
          <Text style={surveyText}>Yeah!</Text>
        </View>
      </View>
      <View>
        <Text style={surveyTitle}>What’s your goal for using the app?</Text>
        <CheckBox
          title="Make one good friend"
          checkedColor="#839297"
          checkedIcon="circle"
          uncheckedIcon="circle-o"
          containerStyle={{ backgroundColor: 'white', borderWidth: 0 }}
          checked
        />
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
  surveyTitle: {
    marginLeft: 20,
    color: '#4a4a4a',
    fontSize: 12,
    marginBottom: 10,
    fontFamily: 'NunitoSans-Bold',
  },
  surveyText: {
    fontFamily: 'NunitoSans-Light',
    fontSize: 13,
    color: '#2d4359',
  },
};
export default FeedbackContent;
