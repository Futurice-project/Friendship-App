import React, { PureComponent } from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import styled from 'styled-components/native';
import Tag from './Tags';

const ButtonOption = styled.View`
  flex: 1;
  align-items: center;
  marginBottom: 50;
  marginTop: 20;
`;

export default class TabProfile extends PureComponent {
  state = {
    backcolor: '#faf6f0',
    colorActif: '#6eb1ea',
    colorInactif: '#2d4359',
    colorTextButton: '#faf6f0',
    colorBackButton: '#2d4359',
    pageIndex: null,
  };

  //allow when we change the tab to have the good colors
  handleChangeScreen = ({ i }) => {
    // **Update ** save current page index
    if (this.state.pageIndex != i) {
      this.setState({ pageIndex: i });

      if (this.state.pageIndex == 1) {
        this.setState({ backcolor: '#faf6f0' });
        this.setState({ colorActif: '#6eb1ea' });
        this.setState({ colorInactif: '#2d4359' });
        this.setState({ colorTextButton: '#faf6f0' });
        this.setState({ colorBackButton: '#2d4359' });
      }
      if (this.state.pageIndex == 0) {
        this.setState({ backcolor: '#2d4359' });
        this.setState({ colorActif: '#87df91' });
        this.setState({ colorInactif: '#faf6f0' });
        this.setState({ colorTextButton: '#6eb1ea' });
        this.setState({ colorBackButton: '#faf6f0' });
      }
    }
  };

  render = () => {
    return (
      <View>
        <ScrollableTabView
          onChangeTab={this.handleChangeScreen}
          style={{ marginTop: 0, backgroundColor: this.state.backcolor }}
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

        <View style={{ backgroundColor: this.state.backcolor }}>
          <ButtonOption>
            <TouchableOpacity
              onPress={this._onPressButton}
              style={[
                styles.buttonStyle,
                { backgroundColor: this.state.colorBackButton },
              ]}
            >
              <Text
                style={[
                  styles.textButtonStyle,
                  { color: this.state.colorTextButton },
                ]}
              >
                Send Message
              </Text>
            </TouchableOpacity>
          </ButtonOption>
        </View>
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
  textButtonStyle: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },

  buttonStyle: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: 241,
    height: 47,
    borderRadius: 34,
  },
});
