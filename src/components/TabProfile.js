import React, { PureComponent } from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import TextRectangle from './TextRectangle';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import styled from 'styled-components/native';

export default class TabProfile extends PureComponent {
  componentDidMount() {}
  render = () => {
    //console.log(this.props.tags.data.map(e => e));
    return (
      <View>
        <ScrollableTabView
          style={{ marginTop: 0 }}
          initialPage={0}
          renderTabBar={() => <ScrollableTabBar />}
        >
          <View tabLabel="NAAHS">
            {this.props.hate.map(e => (
              <TextRectangle key={e.id} Text={e.name} style={styles.rec} />
            ))}
          </View>
          <View tabLabel="YEAH">
            {this.props.love.map(e => (
              <TextRectangle key={e.id} Text={e.name} style={styles.rec} />
            ))}
          </View>
        </ScrollableTabView>
      </View>
    );
  };
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
