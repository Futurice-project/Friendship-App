import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import ReportList from './ReportList';
import reportField from './reportField';
import ReportContent from './ReportContent';

import Icon from 'react-native-vector-icons/Ionicons';
import ReportHeader from './ReportHeader';
import { Card, List, ListItem } from 'react-native-elements';

export default class Report extends Component {
  state = { showContent: false, content: '' };

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

  renderContent() {
    return <ReportContent />;
  }

  render() {
    if (this.state.showContent) {
      return (
        <ReportContent
          data={this.state.content}
          navigateBack={() =>
            this.setState({ showContent: false, content: '' })}
        />
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <ReportHeader
          navigateBack={() => this.props.navigation.goBack()}
          headerText="Report"
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
