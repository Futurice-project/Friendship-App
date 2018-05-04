import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
import {
  FeedbackListItem,
  reportFields,
  ReportContent,
  FeedbackStatus,
  FeedbackHeader,
} from '../../../components/Feedback';

export default class Report extends Component {
  state = {
    showContent: false,
    content: '', // the report category the user has chosen.
    text: '', // the report input field
    showReportStatus: false,
  };

  renderReportList() {
    // my own list component(better customized) to render a list of report field
    return reportFields.map((item, i) => {
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

  sendReport() {
    const userId = this.props.navigation.state.params.data.id;
    const reported_by = this.props.navigation.state.params.data.currentUser;
    const description = this.state.text
      ? this.state.text
      : this.state.content.title;
    fetch(`http://localhost:3888/reports`, {
      method: 'post',
      headers: {
        Authorization: this.props.navigation.state.params.data.auth, // data pass from the react navigation from peopleprofile.view and ChatView.js
      },
      body: JSON.stringify({
        userId,
        description,
        reported_by,
      }),
    }).then(() => this.setState({ showReportStatus: true }));
  }

  render() {
    const reportStatus = {
      title: 'Thank you for your report.',
      subtitle:
        'Your report helps keep Friendship app safe and fun for everyone. We will review your report, and reprimand the user if they are breaking community guidelines.',
    };
    if (this.state.showReportStatus && this.state.showContent) {
      return (
        <FeedbackStatus
          data={reportStatus}
          navigateBack={() => this.props.navigation.goBack()}
        />
      );
    }
    if (this.state.showContent) {
      // after the user clicks on one of the categories
      return (
        <ReportContent
          data={this.state.content}
          navigateBack={() =>
            this.setState({ showContent: false, content: '', text: '' })}
          sendReport={() => this.sendReport()}
          onChange={text => this.setState({ text })}
          onCancel={() => this.props.navigation.goBack()}
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
          headerText="Report"
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
            Choose a reason for reporting this user:
          </Text>
        </View>
        <View style={{ borderTopWidth: 0.5, borderTopColor: '#d4d6d5' }}>
          {this.renderReportList()}
        </View>
      </ScrollView>
    );
  }
}
