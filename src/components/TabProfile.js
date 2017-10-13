import React, { PureComponent } from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import styled from 'styled-components/native';
import Tag from './Tags';
import Button from './Button';

const ButtonOption = styled.View`
  flex: 1;
  align-items: center;
`;

export default class TabProfile extends PureComponent {
  state = {
    color: 'white',
    colorActif: '#6eb1ea',
    colorInactif: '#2d4359',
    pageIndex: null,
  };

  handleChangeScreen = ({ i }) => {
    // **Update ** save current page index
    if (this.state.pageIndex != i) {
      this.setState({ pageIndex: i });

      if (this.state.pageIndex == 1) {
        this.setState({ color: 'white' });
        this.setState({ colorActif: '#6eb1ea' });
        this.setState({ colorInactif: '#2d4359' });
      }
      if (this.state.pageIndex == 0) {
        this.setState({ color: '#2d4359' });
        this.setState({ colorActif: '#87df91' });
        this.setState({ colorInactif: '#faf6f0' });
      }
    }
  };

  render = () => {
    return (
      <View>
        <ScrollableTabView
          onChangeTab={this.handleChangeScreen}
          style={{ marginTop: 0, backgroundColor: this.state.color }}
          initialPage={0}
          renderTabBar={() => <ScrollableTabBar />}
          tabBarActiveTextColor={this.state.colorActif}
          tabBarInactiveTextColor={this.state.colorInactif}
        >
          <View tabLabel="NAAHS" style={styles.tagList}>
            {this.props.hate.map(tag => <Tag key={tag.id} data={tag} dark />)}
          </View>
          <View tabLabel="YEAH" style={styles.tagList}>
            {this.props.love.map(tag => <Tag key={tag.id} data={tag} />)}
          </View>
        </ScrollableTabView>

        <ButtonOption>
          <Button
            title="SEND MESSAGE"
            primary
            border
            textColor="green"
            size="half"
            color="light"
            onPress={this.props.openSignUp}
          />
        </ButtonOption>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  tagList: {
    margin: 22,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
});
