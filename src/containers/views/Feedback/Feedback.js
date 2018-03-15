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
    content: '', // the feedback category the user has chosen.
    suggestion: '',
    showFeedbackStatus: false, //if the ajax request is success or not
    checkBoxs: [],
    rating: 10,
    goalRate: 10,
    others: '', // the last checkbox field which contains an input
    easy: '', //
    hard: '',
    improve: '',
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

  onCheckBoxSelect(value) {
    if (this.state.checkBoxs.indexOf(value) > -1) {
      const checkbox = this.state.checkBoxs.slice();
      checkbox.splice(this.state.checkBoxs.indexOf(value), 1);
      return this.setState({ checkBoxs: checkbox });
    }
    return this.setState({
      checkBoxs: [...this.state.checkBoxs, value],
    });
  }

  checkedStatus(value) {
    const checkboxs = this.state.checkBoxs;
    if (checkboxs.indexOf(value)) {
      return true;
    }
    return false;
  }

  sendFeedback() {
    const currentUser = this.props.navigation.state.params.data.currentUser;
    const {
      suggestion,
      checkBoxs,
      rating,
      goalRate,
      others,
      easy,
      hard,
      improve,
    } = this.state;
    fetch(`http://localhost:3888/feedbacks`, {
      method: 'post',
      headers: {
        Authorization: this.props.navigation.state.params.data.auth, // data pass from the react navigation from peopleprofile.view and ChatView.js
      },
      body: JSON.stringify({
        suggestion,
        checkBoxs,
        rating,
        goalRate,
        others,
        easy,
        hard,
        improve,
        currentUser,
      }),
    }).then(() => this.setState({ showFeedbackStatus: true }));
  }

  getInitialState() {
    //reset state
    this.setState({
      showContent: false,
      content: '',
      suggestion: '',
      checkBoxs: [],
      rating: 10,
      goalRate: 10,
      others: '',
      easy: '',
      hard: '',
      improve: '',
    });
  }

  render() {
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
          navigateBack={() => this.getInitialState()}
          sendReport={() => this.sendFeedback()}
          suggestion={this.state.suggestion}
          onChange={suggestion => this.setState({ suggestion })}
          onCancel={() => this.props.navigation.goBack()}
          onChecked={value => this.onCheckBoxSelect.bind(this, value)}
          checked={value => this.checkedStatus(value)}
          rating={this.state.rating}
          goalRate={this.state.goalRate}
          onRatingChange={rating => this.setState({ rating })}
          onGoalRateChange={goalRate => this.setState({ goalRate })}
          others={this.state.others}
          onOtherChange={others => this.setState({ others })}
          easy={this.state.easy}
          onEasyChange={easy => this.setState({ easy })}
          hard={this.state.hard}
          onHardChange={hard => this.setState({ hard })}
          improve={this.state.improve}
          onImproveChange={improve => this.setState({ improve })}
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
