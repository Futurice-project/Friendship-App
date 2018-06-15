import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Tag from '../Tags';

const initialState = {
  bckColor: '#2a343c',
  yeahsTextColor: '#ff8a65',
  nahsTextColor: '#949795',
  btnBackColor: '#faf5f0',
  btnTextColor: '#2d4359',
  tabIndex: true,
};

export default class TabProfile extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  componentWillMount() {
    const naahsActivities = this.props.hate.filter(e => e.category === 1);
    const naahsInterests = this.props.hate.filter(e => e.category === 2);
    const naahsFriendship = this.props.hate.filter(e => e.category === 3);

    const yeahActivities = this.props.love.filter(e => e.category === 1);
    const yeahInterests = this.props.love.filter(e => e.category === 2);
    const yeahFriendship = this.props.love.filter(e => e.category === 3);

    this.setState({
      yeahActivities,
      naahsActivities,
      yeahInterests,
      naahsInterests,
    });
  }

  //allow when we change the tab to have the good colors
  onChangeTab() {
    const { tabIndex } = this.state;
    let tmpState;
    switch (tabIndex) {
      case false:
        tmpState = initialState;
        break;
      default:
        tmpState = {
          bckColor: '#ffffff',
          yeahsTextColor: '#949795',
          nahsTextColor: '#99ccff',
          btnBackColor: '#2a343c',
          btnTextColor: '#faf5f0',
          tabIndex: false,
        };
    }
    this.setState(tmpState);
  }

  renderSendMsg() {
    const { bckColor, btnBackColor, btnTextColor } = this.state;
    const roomExists =
      this.props.existingChatRoom !== undefined
        ? this.props.openChatView
        : this.props.onChatRequest;

    if (!this.props.myprofile) {
      return (
        <View style={{ backgroundColor: bckColor }}>
          <View style={styles.ButtonOption}>
            <TouchableOpacity
              onPress={roomExists}
              style={[styles.buttonStyle, { backgroundColor: btnBackColor }]}
            >
              <Text style={[styles.textButtonStyle, { color: btnTextColor }]}>
                Send Message
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }

  renderTags(activities, interests) {
    const { tabIndex } = this.state;
    return (
      <View>
        <Text
          style={tabIndex ? styles.tagCategoriesLove : styles.tagCategoriesHate}
        >
          ACTIVITIES
        </Text>
        <View style={styles.tagList}>
          {activities.map(tag => (
            <Tag key={tag.id} data={tag} dark={!tabIndex} />
          ))}
        </View>
        <Text
          style={tabIndex ? styles.tagCategoriesLove : styles.tagCategoriesHate}
        >
          INTERESTS
        </Text>
        <View style={styles.tagList}>
          {interests.map(tag => (
            <Tag key={tag.id} data={tag} dark={!tabIndex} />
          ))}
        </View>
      </View>
    );
  }

  render = () => {
    let activities;
    let interests;

    switch (this.state.tabIndex) {
      case true:
        activities = this.state.yeahActivities;
        interests = this.state.yeahInterests;
        break;
      default:
        activities = this.state.naahsActivities;
        interests = this.state.naahsInterests;
    }
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: this.state.bckColor,
        }}
      >
        <View
          style={{ display: 'flex', flexDirection: 'row', marginBottom: 20 }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              borderBottomColor: this.state.yeahsTextColor,
              borderBottomWidth: 2,
              marginHorizontal: 15,
            }}
            onPress={() => {
              if (!this.state.tabIndex) {
                this.onChangeTab();
              }
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'Friendship_version_2',
                fontSize: 30,
                letterSpacing: 3.2,
                color: this.state.yeahsTextColor,
              }}
            >
              YEAHS
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              borderBottomColor: this.state.nahsTextColor,
              borderBottomWidth: 2,
              marginHorizontal: 15,
            }}
            onPress={() => {
              if (this.state.tabIndex) {
                this.onChangeTab();
              }
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'Friendship_version_2',
                fontSize: 30,
                letterSpacing: 3.2,
                color: this.state.nahsTextColor,
              }}
            >
              NAHS
            </Text>
          </TouchableOpacity>
        </View>
        {this.renderTags(activities, interests)}
        {this.renderSendMsg()}
      </View>
    );
  };
}

const styles = StyleSheet.create({
  tagList: {
    marginVertical: 15,
    marginHorizontal: 22,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  textButtonStyle: {
    alignSelf: 'center',
    fontSize: 20,
    fontFamily: 'NunitoSans-Bold',
  },
  tagCategoriesLove: {
    alignSelf: 'center',
    flexGrow: 1,
    textAlign: 'center',
    color: '#ff8a65',
    fontSize: 13,
  },
  tagCategoriesHate: {
    alignSelf: 'center',
    flexGrow: 1,
    textAlign: 'center',
    color: '#6eb1ea',
    fontSize: 13,
  },
  buttonStyle: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: 241,
    height: 47,
    borderRadius: 34,
  },
  tabLabel: {
    fontFamily: 'Friendship_version_2',
    fontSize: 30,
    letterSpacing: 3,
  },
  ButtonOption: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 50,
    marginTop: 20,
  },
});
