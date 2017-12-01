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
    tabIndex: 0,
  };

  //allow when we change the tab to have the good colors
  handleChangeTab = ({ i }) => {
    // **Update ** save current page index
    if (i == 0) {
      // NAAHS
      this.setState({
        backcolor: '#faf6f0',
        colorInactif: '#2d4359',
        colorActif: '#6eb1ea',
        colorTextButton: '#faf6f0',
        colorBackButton: '#2d4359',
      });
    } else {
      // YEAH
      this.setState({
        backcolor: '#2d4359',
        colorActif: '#ff8a65',
        colorInactif: '#faf6f0',
        colorTextButton: '#6eb1ea',
        colorBackButton: '#faf6f0',
      });
    }
  };

  renderSendMsg() {
    if (!this.props.myprofile) {
      return (
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
      );
    }
  }

  render = () => {
    return (
      <View>
        <ScrollableTabView
          onChangeTab={this.handleChangeTab}
          style={{ marginTop: 0, backgroundColor: this.state.backcolor }}
          initialPage={0}
          renderTabBar={() => <ScrollableTabBar />}
          tabBarActiveTextColor={this.state.colorActif}
          tabBarInactiveTextColor={this.state.colorInactif}
        >
          <View tabLabel="NAAHS">
            <Text style={styles.tagCategoriesHate}>ACTIVITIES</Text>
            <View style={styles.tagList}>
              {this.props.hate
                .filter(e => e.category === 1)
                .map(tag => <Tag key={tag.id} data={tag} dark />)}
            </View>
            <Text style={styles.tagCategoriesHate}>INTERESTS</Text>
            <View style={styles.tagList}>
              {this.props.hate
                .filter(e => e.category === 2)
                .map(tag => <Tag key={tag.id} data={tag} dark />)}
            </View>
            <Text style={styles.tagCategoriesHate}>FRIENDSHIP</Text>
            <View style={styles.tagList}>
              {this.props.hate
                .filter(e => e.category === 3)
                .map(tag => <Tag key={tag.id} data={tag} dark />)}
            </View>
          </View>
          <View tabLabel="YEAH">
            <Text style={styles.tagCategoriesLove}>ACTIVITIES</Text>
            <View style={styles.tagList}>
              {this.props.love
                .filter(e => e.category === 1)
                .map(tag => <Tag key={tag.id} data={tag} />)}
            </View>
            <Text style={styles.tagCategoriesLove}>INTERESTS</Text>
            <View style={styles.tagList}>
              {this.props.love
                .filter(e => e.category === 2)
                .map(tag => <Tag key={tag.id} data={tag} />)}
            </View>
            <Text style={styles.tagCategoriesLove}>FRIENDSHIP</Text>
            <View style={styles.tagList}>
              {this.props.love
                .filter(e => e.category === 3)
                .map(tag => <Tag key={tag.id} data={tag} />)}
            </View>
          </View>
        </ScrollableTabView>
        {this.renderSendMsg()}
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
  tagCategoriesLove: {
    alignSelf: 'center',
    flexGrow: 1,
    textAlign: 'center',
    color: '#ff8a65',
    fontSize: 17,
  },
  tagCategoriesHate: {
    alignSelf: 'center',
    flexGrow: 1,
    textAlign: 'center',
    color: '#6eb1ea',
    fontSize: 17,
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
