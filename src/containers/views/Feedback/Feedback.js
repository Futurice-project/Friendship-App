import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import FeedbackListItem from '../../../components/Feedback/FeedbackListItem';
import feedbackFields from '../../../components/Feedback/feedbackField'; //this is the json file
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
    findFriendEasy: '', //
    findFriendHard: '',
    suggestImprovement: '',
  };

  renderFeedbackList() {
    // my own list component(better customized) to render a list of report field
    return feedbackFields.map((item, i) => {
      return (
        <TouchableOpacity
          key={i}
          onPress={() => this.setState({ showContent: true, content: item })}
        >
          <FeedbackListItem data={item} />
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
    const given_by = this.props.navigation.state.params.data.currentUser;
    const {
      suggestion,
      others,
      findFriendEasy,
      findFriendHard,
      suggestImprovement,
    } = this.state;
    const rating = Math.round(this.state.rating);
    const goalRate = Math.round(this.state.goalRate);
    const checkBoxs = this.state.checkBoxs;
    let OtherReason = 'none';
    if (checkBoxs.indexOf(5) > -1 && others) {
      OtherReason = others;
    }
    fetch(`http://localhost:3888/feedbacks`, {
      method: 'post',
      headers: {
        Authorization: this.props.navigation.state.params.data.auth, // data pass from the react navigation from peopleprofile.view and ChatView.js
      },
      body: JSON.stringify({
        suggestion,
        rating,
        goalRate,
        checkBoxs,
        findFriendEasy,
        findFriendHard,
        suggestImprovement,
        given_by,
        OtherReason,
      }),
    }).then(() => this.setState({ showFeedbackStatus: true }));
  }

  getInitialState() {
    //reset state on navigate back
    this.setState({
      showContent: false,
      content: '',
      suggestion: '',
      checkBoxs: [],
      rating: 10,
      goalRate: 10,
      others: '',
      findFriendEasy: '',
      findFriendHard: '',
      suggestImprovement: '',
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
          onChecked={value => this.onCheckBoxSelect.bind(this, value)} // for the check box
          checked={value => this.checkedStatus(value)} // for the check box
          rating={this.state.rating} // rating slider
          goalRate={this.state.goalRate} // goal rating slider
          onRatingChange={rating => this.setState({ rating })} // rating slider
          onGoalRateChange={goalRate => this.setState({ goalRate })} // goal rating slider
          others={this.state.others} // for the last field of checkbox called other, it has an input field
          onOtherChange={others => this.setState({ others })} // same as above
          findFriendEasy={this.state.findFriendEasy} // What about the app has made finding one good friend easy?
          onEasyChange={findFriendEasy => this.setState({ findFriendEasy })}
          findFriendHard={this.state.findFriendHard} // What about the app has made finding one good friend hard?
          onHardChange={findFriendHard => this.setState({ findFriendHard })}
          suggestImprovement={this.state.suggestImprovement} // How could we improve?
          onImproveChange={suggestImprovement =>
            this.setState({ suggestImprovement })}
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
