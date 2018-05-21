import React, { PureComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import Person from './Person';

export default class TabForTags extends PureComponent {
  state = {
    bckColor: '#2a343c',
    yeahsTextColor: '#ff8a65',
    nahsTextColor: '#949795',
    tabIndex: true,
  };

  onChangeTab() {
    const { tabIndex } = this.state;
    let tmpState;
    switch (tabIndex) {
      case false:
        tmpState = {
          bckColor: '#2a343c',
          yeahsTextColor: '#ff8a65',
          nahsTextColor: '#949795',
          btnType: 'dark',
          tabIndex: true,
        };
        break;
      default:
        tmpState = {
          bckColor: '#ffffff',
          yeahsTextColor: '#949795',
          nahsTextColor: '#99ccff',
          btnType: 'light',
          tabIndex: false,
        };
    }
    this.setState(tmpState);
  }

  renderUsers(users) {
    const { tabIndex } = this.state;
    return (
      <View>
        <View>
          <View style={styles.tagList}>
            {users.map(user => <Person key={user.userId} data={user} />)}
          </View>
        </View>
      </View>
    );
  }

  render = () => {
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
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
        {this.renderUsers(
          this.state.tabIndex ? this.props.usersLove : this.props.usersHate,
        )}
      </View>
    );
  };
}

const styles = StyleSheet.create({
  tagList: {
    margin: 22,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  textButtonStyle: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  tagCategoriesLove: {
    marginTop: 10,
    alignSelf: 'center',
    flexGrow: 1,
    textAlign: 'center',
    color: '#ff8a65',
    fontSize: 17,
  },
  tagCategoriesHate: {
    marginTop: 10,
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
  tabLabel: {
    fontFamily: 'Friendship_version_2',
    fontSize: 30,
    letterSpacing: 3,
  },
});
