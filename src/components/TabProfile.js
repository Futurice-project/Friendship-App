import React, { PureComponent } from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import TextRectangle from './TextRectangle';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import styled from 'styled-components/native';

export default class TabProfile extends PureComponent {
  componentDidMount() {
    console.log('====================================');
    console.log(this.props.tags);
    console.log('====================================');
  }
  render = () =>
    console.log(this.props.tags) || (
      <View>
        <ScrollableTabView
          style={{ marginTop: 0 }}
          initialPage={0}
          renderTabBar={() => <ScrollableTabBar />}
        >
          <View tabLabel="LOVE">
            <TextRectangle Text="as" style={styles.rec} />
            <TextRectangle Text="react" style={styles.rec} />
            <TextRectangle Text="dogs" style={styles.rec} />
            <TextRectangle Text="Basketball" style={styles.rec} />
          </View>
          <View tabLabel="HATE">
            <TextRectangle Text="dating apps" style={styles.rec} />
            <TextRectangle Text="reading" style={styles.rec} />
          </View>
        </ScrollableTabView>
      </View>
    );
}

const styles = StyleSheet.create({
  Confirm: {
    height: 57,
    backgroundColor: '#3b3b3d',
    marginTop: 10,
  },
  rec: {
    height: 81,
    backgroundColor: '#596386',
    marginTop: 6,
  },
});
