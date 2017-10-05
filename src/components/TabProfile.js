import React, { PureComponent } from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import TextRectangle from './TextRectangle';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import styled from 'styled-components/native';
import Tag from './Tags';

export default class TabProfile extends PureComponent {
  componentDidMount() {}
  render = () => {
    return (
      <View>
        <ScrollableTabView
          style={{ marginTop: 0 }}
          initialPage={0}
          renderTabBar={() => <ScrollableTabBar />}
        >
          <View tabLabel="NAAHS">
            {this.props.hate.map(tag => <Tag key={tag.id} data={tag} />)}
          </View>
          <View tabLabel="YEAH">
            {this.props.love.map(tag => <Tag key={tag.id} data={tag} />)}
          </View>
        </ScrollableTabView>
      </View>
    );
  };
}

const styles = StyleSheet.create({});
