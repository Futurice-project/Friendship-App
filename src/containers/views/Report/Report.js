import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ReportList from './ReportList';
import reportField from './reportField';
import ReportContent from './ReportContent';
import ReportStatus from './ReportStatus';
import Icon from 'react-native-vector-icons/Ionicons';
import ReportHeader from './ReportHeader';

export default class Report extends Component {
  state = {
    showContent: false,
    content: '',
    text: '',
    showReportStatus: false,
    isReportStatusVisible: false,
  };

  renderReportList() {
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
        Authorization: this.props.navigation.state.params.data.auth,
      },
      body: JSON.stringify({
        userId,
        description,
        reported_by,
      }),
    }).then(() => this.setState({ showReportStatus: true }));
  }

  render() {
    console.log(this.props.navigation.state.params.data);
    if (this.state.showReportStatus && this.state.showContent) {
      return (
        <ReportStatus
          navigateBack={() =>
            this.setState({
              showContent: false,
              showReportStatus: false,
              content: '',
              text: '',
            })}
        />
      );
    }
    if (this.state.showContent) {
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
