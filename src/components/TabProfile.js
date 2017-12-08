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
    colorInactif: '#b3abab',
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
        colorInactif: '#b3abab',
        colorActif: '#6eb1ea',
        colorTextButton: '#faf6f0',
        colorBackButton: '#2d4359',
      });
    } else {
      // YEAH
      this.setState({
        backcolor: '#2a343c',
        colorActif: '#ff8a65',
        colorInactif: '#b3abab',
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
    const naahsActivities = this.props.hate.filter(e => e.category === 1);
    const naahsInterests = this.props.hate.filter(e => e.category === 2);
    const naahsFriendship = this.props.hate.filter(e => e.category === 3);

    const yeahActivities = this.props.love.filter(e => e.category === 1);
    const yeahInterests = this.props.love.filter(e => e.category === 2);
    const yeahFriendship = this.props.love.filter(e => e.category === 3);

    return (
      <View>
        <ScrollableTabView
          onChangeTab={this.handleChangeTab}
          tabBarTextStyle={styles.tabLabel}
          style={{ marginTop: 0, backgroundColor: this.state.backcolor }}
          initialPage={0}
          renderTabBar={() => <ScrollableTabBar />}
          tabBarActiveTextColor={this.state.colorActif}
          tabBarInactiveTextColor={this.state.colorInactif}
        >
          <View tabLabel="NAAHS">
            {naahsActivities.length > 0 && (
              <View>
                <Text style={styles.tagCategoriesHate}>ACTIVITIES</Text>
                <View style={styles.tagList}>
                  {naahsActivities.map(tag => (
                    <Tag key={tag.id} data={tag} dark />
                  ))}
                </View>
              </View>
            )}

            {naahsInterests.length > 0 && (
              <View>
                <Text style={styles.tagCategoriesHate}>INTERESTS</Text>
                <View style={styles.tagList}>
                  {naahsInterests.map(tag => (
                    <Tag key={tag.id} data={tag} dark />
                  ))}
                </View>
              </View>
            )}

            {naahsFriendship.length > 0 && (
              <View>
                <Text style={styles.tagCategoriesHate}>FRIENDSHIP</Text>
                <View style={styles.tagList}>
                  {naahsFriendship.map(tag => (
                    <Tag key={tag.id} data={tag} dark />
                  ))}
                </View>
              </View>
            )}
          </View>

          <View tabLabel="YEAH">
            {yeahActivities.length > 0 && (
              <View>
                <Text style={styles.tagCategoriesLove}>ACTIVITIES</Text>
                <View style={styles.tagList}>
                  {yeahActivities.map(tag => <Tag key={tag.id} data={tag} />)}
                </View>
              </View>
            )}

            {yeahInterests.length > 0 && (
              <View>
                <Text style={styles.tagCategoriesLove}>INTERESTS</Text>
                <View style={styles.tagList}>
                  {yeahInterests.map(tag => <Tag key={tag.id} data={tag} />)}
                </View>
              </View>
            )}

            {yeahFriendship.length > 0 && (
              <View>
                <Text style={styles.tagCategoriesLove}>FRIENDSHIP</Text>
                <View style={styles.tagList}>
                  {yeahFriendship.map(tag => <Tag key={tag.id} data={tag} />)}
                </View>
              </View>
            )}
          </View>
        </ScrollableTabView>
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
    fontWeight: 'bold',
  },
  tagCategoriesLove: {
    marginTop: 45,
    alignSelf: 'center',
    flexGrow: 1,
    textAlign: 'center',
    color: '#ff8a65',
    fontSize: 13,
  },
  tagCategoriesHate: {
    marginTop: 45,
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
});
