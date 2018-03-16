import React from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput as Input,
} from 'react-native';
import TextInput from '../TextInput';
import CheckBoxs from './CheckBoxs';
import Icon from 'react-native-vector-icons/Ionicons';
import FeedbackHeader from './FeedbackHeader';
import Slider from './Slider';
import SurveyQuestion from './SurveyQuestion';
import Styles from './Layout';

export default class FeedbackContent extends React.Component {
  render() {
    const {
      data,
      navigateBack,
      sendReport,
      onCancel,
      onChange,
      onChecked,
      rating,
      goalRate,
      onRatingChange,
      onGoalRateChange,
      others,
      onOtherChange,
      findFriendEasy,
      findFriendHard,
      suggestImprovement,
      suggestion,
      onEasyChange,
      onHardChange,
      onImproveChange,
    } = this.props;
    const {
      title,
      text,
      feedbackInput,
      interestInput,
      surveyTitle,
      surveyText,
    } = Styles;
    if (data.content.title !== 'Feedback for Friendship app') {
      return (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
          <FeedbackHeader
            navigateBack={navigateBack}
            headerText="Feedback"
            onCancel={onCancel}
          />
          <View style={{ padding: 10 }}>
            <Text
              style={[
                title,
                { paddingLeft: 20, marginTop: 20, marginBottom: 15 },
              ]}
            >
              {data.content.title}
            </Text>
            {data.content.title === 'Send us an idea' ? (
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                placeholder={data.content.subtitle}
                multiline={true}
                style={feedbackInput}
                value={suggestion}
                name="suggestion"
                onChangeText={text => onChange(text)}
              />
            ) : (
              <View>
                <Text style={[text, { paddingLeft: 20 }]}>
                  {data.content.subtitle}
                </Text>
                <TextInput
                  autoCorrect={false}
                  autoCapitalize="none"
                  placeholder={data.content.placeholder}
                  placeholderTextColor="#3b3b3d"
                  multiline={true}
                  value={suggestion}
                  name="suggestion"
                  onChangeText={text => onChange(text)}
                  style={[interestInput, { borderBottomWidth: 0 }]}
                />
              </View>
            )}
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
      // this is almost hard coded due to large differences
      <ScrollView style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <FeedbackHeader
          navigateBack={navigateBack}
          headerText="Feedback"
          onCancel={onCancel}
        />
        <View style={{ padding: 30 }}>
          <Text style={[title, { marginBottom: 10 }]}>
            {data.content.title}
          </Text>
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
          <Slider rating={rating} onRatingChange={onRatingChange} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginLeft: 30,
              marginRight: 30,
            }}
          >
            <Text style={surveyText}>Naah...</Text>
            <Text style={surveyText}>Meh.</Text>
            <Text style={surveyText}>Yeah!</Text>
          </View>
        </View>
        <View style={{ marginLeft: 20, marginBottom: 20 }}>
          <Text style={[surveyTitle, { marginBottom: 20 }]}>
            What’s your goal for using the app?
          </Text>
          {data.content.checkbox.map((item, index) => (
            <CheckBoxs title={item} key={index} onIconPress={onChecked(item)} />
          ))}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 20,
            }}
          >
            <CheckBoxs title="Other:" onIconPress={onChecked('Other')} />
            <Input
              style={{
                borderBottomColor: '#839297',
                borderBottomWidth: 1,
                width: 100,
                marginLeft: -13,
              }}
              placeholder="write something"
              onChangeText={text => onOtherChange(text)}
              value={others}
            />
          </View>
        </View>
        <View
          style={{
            marginBottom: 20,
            marginLeft: 10,
            marginRight: 10,
            alignItems: 'stretch',
          }}
        >
          <Text style={[surveyTitle, { marginLeft: 20 }]}>
            How well have you accomplished your goal of making one good friend?
          </Text>
          <Slider rating={goalRate} onRatingChange={onGoalRateChange} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginLeft: 30,
              marginRight: 30,
            }}
          >
            <Text style={surveyText}>Not at all</Text>
            <Text style={surveyText}>OKish</Text>
            <Text style={surveyText}>Very well</Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ marginBottom: 30, marginTop: 10 }}>
            <Text
              style={[
                surveyTitle,
                { marginLeft: 30, marginRight: 20, marginBottom: 10 },
              ]}
            >
              {data.content.inputForm[0].title}
            </Text>
            <SurveyQuestion
              subtitle={data.content.inputForm[0].subtitle}
              onChange={onEasyChange}
              value={findFriendEasy}
            />
          </View>
          <View style={{ marginBottom: 30 }}>
            <Text
              style={[
                surveyTitle,
                { marginLeft: 30, marginRight: 20, marginBottom: 10 },
              ]}
            >
              {data.content.inputForm[1].title}
            </Text>
            <SurveyQuestion
              subtitle={data.content.inputForm[1].subtitle}
              onChange={onHardChange}
              value={findFriendHard}
            />
          </View>
          <View>
            <Text
              style={[
                surveyTitle,
                { marginLeft: 30, marginRight: 20, marginBottom: 10 },
              ]}
            >
              {data.content.inputForm[2].title}
            </Text>
            <SurveyQuestion
              subtitle={data.content.inputForm[2].subtitle}
              onChange={onImproveChange}
              value={suggestImprovement}
            />
          </View>
        </View>
        <View
          style={{ marginTop: 10, alignItems: 'center', paddingBottom: 30 }}
        >
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
  }
}
