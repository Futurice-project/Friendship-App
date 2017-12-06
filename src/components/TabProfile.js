import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import styled from 'styled-components/native';
import Tag from './Tags';
import rest from '../utils/rest';

const ButtonOption = styled.View`
  flex: 1;
  align-items: center;
  marginBottom: 50;
  marginTop: 20;
`;

class TabProfile extends PureComponent {
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

  createChatRoom = () => {
    this.props.createChatRoom(
      this.currentUserId,
      this.props.user.id,
      this.openChatView,
    );
  };

  openChatView = chatroomId => {
    this.props.openChatView(
      chatroomId,
      this.props.user.username,
      this.props.user.emoji,
    );
  };

  renderSendMsg() {
    if (!this.props.myprofile) {
      return (
        <View style={{ backgroundColor: this.state.backcolor }}>
          <ButtonOption>
            <TouchableOpacity
              onPress={() => this.createChatRoom()}
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
          <View tabLabel="NAAHS" style={styles.tagList}>
            {this.props.hate.map(tag => <Tag key={tag.id} data={tag} dark />)}
          </View>
          <View tabLabel="YEAH" style={styles.tagList}>
            {this.props.love.map(tag => <Tag key={tag.id} data={tag} />)}
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

  buttonStyle: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: 241,
    height: 47,
    borderRadius: 34,
  },
});

const mapDispatchToProps = dispatch => ({
  createChatRoom: (userCreatorId, userReceiverId, callback) => {
    dispatch(
      rest.actions.createChatRoom(
        {},
        {
          body: JSON.stringify({ userCreatorId, userReceiverId }),
        },
        (err, data) => callback(data.id),
      ),
    );
  },
  openChatView: (chatroomId, username, userEmoji) =>
    dispatch(
      NavigationActions.navigate({
        routeName: 'ChatView',
        params: { chatroomId, username, userEmoji },
      }),
    ),
});

const mapStateToProps = state => ({
  currentUserId: state.auth.data.decoded ? state.auth.data.decoded.id : null,
});

export default connect(mapStateToProps, mapDispatchToProps)(TabProfile);
