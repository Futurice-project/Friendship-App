import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ReportList from './ReportList';
import reportField from './reportField'; //this is the json file
import ReportContent from './ReportContent';
import ReportStatus from './ReportStatus';
import Icon from 'react-native-vector-icons/Ionicons';
import ReportHeader from './ReportHeader';

export default class Report extends Component {
  state = {
    showContent: false,
    content: '', // the report category the user has chosen.
    text: '', // the report input field
    showReportStatus: false,
  };

  renderReportList() {
    // my own list component(better customized) to render a list of report field
    return reportField.map((item, i) => {
      return (
        <TouchableOpacity
          key={i}
          onPress={() => this.setState({ showContent: true, content: item })}
        >
          <ReportList data={item} />
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
    if (this.state.showReportStatus && this.state.showContent) {
      return (
        <ReportStatus navigateBack={() => this.props.navigation.goBack()} />
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
      <View style={{ flex: 1 }}>
        <ReportHeader
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
      </View>
    );
  }
}
