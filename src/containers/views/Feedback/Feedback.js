import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import FeedbackList from '../../../components/Feedback/FeedbackList';
import feedbackField from '../../../components/Feedback/feedbackField'; //this is the json file
import FeedbackContent from '../../../components/Feedback/FeedbackContent';
import FeedbackStatus from '../../../components/Feedback/FeedbackStatus';
import Icon from 'react-native-vector-icons/Ionicons';
import FeedbackHeader from './../../../components/Feedback/FeedbackHeader';

export default class Feedback extends Component {
  state = {
    showContent: false,
    content: '', // the report category the user has chosen.
    text: '', // the report input field
    showFeedbackStatus: false,
    checkBox: false,
    rating: 10,
    goalRate: 10,
  };

  renderFeedbackList() {
    // my own list component(better customized) to render a list of report field
    return feedbackField.map((item, i) => {
      return (
        <TouchableOpacity
          key={i}
          onPress={() => this.setState({ showContent: true, content: item })}
        >
          <FeedbackList data={item} />
        </TouchableOpacity>
      );
    });
  }

  onCheckBotChange() {}

  sendFeedback() {
    this.setState({ showFeedbackStatus: true });
  }

  render() {
    console.log(this.state.goalRate);
    const feedbackStatus = {
      title: 'Thank you for your feedback!',
      subtitle:
        'Feedback is awesome and so are you! We continuously make improvements based on users suggestions. Your input is valuable.',
    };
    if (this.state.showFeedbackStatus && this.state.showContent) {
      return (
        <FeedbackStatus
          data={feedbackStatus}
          navigateBack={() => this.props.navigation.goBack()}
        />
      );
    }
    if (this.state.showContent) {
      // after the user clicks on one of the categories
      return (
        <FeedbackContent
          data={this.state.content}
          navigateBack={() =>
            this.setState({ showContent: false, content: '', text: '' })}
          sendReport={() => this.sendFeedback()}
          onChange={text => this.setState({ text })}
          onCancel={() => this.props.navigation.goBack()}
          onChecked={() => this.setState({ checkBox: !this.state.checkBox })}
          checked={this.state.checkBox}
          rating={this.state.rating}
          goalRate={this.state.goalRate}
          onRatingChange={rating => this.setState({ rating })}
          onGoalRateChange={goalRate => this.setState({ goalRate })}
        />
      );
    }
    return (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: '#ffffff',
        }}
      >
        <FeedbackHeader
          navigateBack={() => this.props.navigation.goBack()}
          headerText="Feedback"
          onCancel={() => this.props.navigation.goBack()}
        />
        <View style={{ padding: 25 }}>
          <Text
            style={{
              color: '#839297',
              fontFamily: 'NunitoSans-Light',
              fontSize: 16,
              lineHeight: 25,
            }}
          >
            We love to hear feedback!
          </Text>
        </View>
        <View style={{ borderTopWidth: 0.5, borderTopColor: '#d4d6d5' }}>
          {this.renderFeedbackList()}
        </View>
      </ScrollView>
    );
  }
}
