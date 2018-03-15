import React from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput as Input,
} from 'react-native';
import TextInput from '../TextInput';
import { CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import FeedbackHeader from './FeedbackHeader';
import { Slider } from 'react-native-elements';
import { FormInput } from 'react-native-elements';

const FeedbackContent = ({
  data,
  navigateBack,
  sendReport,
  onChange,
  onCancel,
  onChecked,
  checked,
}) => {
  const {
    title,
    text,
    feedbackInput,
    interestInput,
    surveyTitle,
    surveyText,
    checkBoxText,
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
    <ScrollView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <FeedbackHeader
        navigateBack={navigateBack}
        headerText="Feedback"
        onCancel={onCancel}
      />
      <View style={{ padding: 30 }}>
        <Text style={[title, { marginBottom: 10 }]}>{data.content.title}</Text>
        <Text style={[text]}>{data.content.subtitle}</Text>
      </View>
      <View
        style={{
          marginBottom: 20,
          marginLeft: 10,
          alignItems: 'stretch',
        }}
      >
        <Text style={[surveyTitle, { marginLeft: 20 }]}>
          How would you rate the app?
        </Text>
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
      <View style={{ marginLeft: 20, marginBottom: 20 }}>
        <Text style={surveyTitle}>What’s your goal for using the app?</Text>
        <CheckBox
          title="Make one good friend"
          textStyle={checkBoxText}
          checkedColor="#839297"
          checkedIcon="circle"
          uncheckedIcon="circle-o"
          containerStyle={{
            backgroundColor: 'white',
            borderWidth: 0,
            padding: 0,
          }}
          onIconPress={onChecked}
          checked={checked}
        />
        <CheckBox
          title="Find a friend group"
          textStyle={checkBoxText}
          checkedColor="#839297"
          checkedIcon="circle"
          uncheckedIcon="circle-o"
          containerStyle={{
            backgroundColor: 'white',
            borderWidth: 0,
            padding: 0,
          }}
          onIconPress={onChecked}
          checked={checked}
        />
        <CheckBox
          title="Find fun events"
          textStyle={checkBoxText}
          checkedColor="#839297"
          checkedIcon="circle"
          uncheckedIcon="circle-o"
          containerStyle={{
            backgroundColor: 'white',
            borderWidth: 0,
            padding: 0,
          }}
          onIconPress={onChecked}
          checked={checked}
        />
        <CheckBox
          title="Find friends to do specific activities with "
          textStyle={checkBoxText}
          checkedColor="#839297"
          checkedIcon="circle"
          uncheckedIcon="circle-o"
          containerStyle={{
            backgroundColor: 'white',
            borderWidth: 0,
            padding: 0,
          }}
          onIconPress={onChecked}
          checked={checked}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20,
          }}
        >
          <CheckBox
            title="Other"
            checkedColor="#839297"
            textStyle={checkBoxText}
            checkedIcon="circle"
            uncheckedIcon="circle-o"
            containerStyle={{
              backgroundColor: 'white',
              borderWidth: 0,
              padding: 0,
            }}
            checked
          />
          <FormInput
            inputStyle={{
              borderBottomColor: '#839297',
              borderBottomWidth: 1,
              width: 100,
            }}
            placeholder="write something"
          />
        </View>
        <View
          style={{
            marginBottom: 20,
            alignItems: 'stretch',
          }}
        >
          <Text style={[surveyTitle, { marginLeft: 10 }]}>
            How well have you accomplished your goal of making one good friend?
          </Text>
          <Slider
            style={{
              marginLeft: 20,
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
            <Text style={surveyText}>Not at all</Text>
            <Text style={surveyText}>OKish</Text>
            <Text style={surveyText}>Very well</Text>
          </View>
        </View>
        {data.content.inputForm.map((item, index) => (
          <View key={index} style={{ padding: 10 }}>
            <Text style={[title, { marginBottom: 20 }]}>{item.title}</Text>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              placeholder={item.subtitle}
              multiline={true}
              style={feedbackInput}
            />
          </View>
        ))}
      </View>
      <View style={{ marginTop: 10, alignItems: 'center', paddingBottom: 30 }}>
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
    </ScrollView>
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
    marginRight: 10,
    marginTop: 4,
    paddingRight: 40,
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
    marginLeft: 10,
    color: '#4a4a4a',
    fontSize: 12,
    marginBottom: 5,
    fontFamily: 'NunitoSans-Bold',
  },
  surveyText: {
    fontFamily: 'NunitoSans-Light',
    fontSize: 13,
    color: '#2d4359',
  },
  checkBoxText: {
    color: '#2d4359',
    fontFamily: 'NunitoSans-Light',
    fontSize: 13,
    letterSpacing: 1.5,
  },
};
export default FeedbackContent;
