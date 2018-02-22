import React, { PureComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import styled from 'styled-components/native';
import Tag from '../Tags';
import ParticipantList from './ParticipantList';

const ButtonOption = styled.View`
  flex: 1;
  align-items: center;
  marginBottom: 30;
  marginTop: 30;
`;

export default class TabEvent extends PureComponent {
  state = {
    backcolor: '#faf6f0',
    colorActif: '#6eb1ea',
    colorInactif: '#b3abab',
    colorTextButton: '#faf6f0',
    colorBackButton: '#2d4359',
    tabIndex: 0,
  };

  renderJoinThis() {
    return (
      <View style={{ backgroundColor: '#ffffff' }}>
        <ButtonOption>
          <TouchableOpacity
            onPress={this._onPressButton}
            style={[styles.buttonStyle, { backgroundColor: '#F9F6F1' }]}
          >
            <Text style={[styles.textButtonStyle, { color: '#2d4359' }]}>
              Join this
            </Text>
          </TouchableOpacity>
        </ButtonOption>
      </View>
    );
  }

  render = () => {
    console.log(this.props.participants.data[0].rows);
    return (
      <View style={{ backgroundColor: '#ffffff' }}>
        {this.renderJoinThis()}
        <ParticipantList participants={this.props.participants} />
        {this.renderJoinThis()}
      </View>
    );
  };
}

const styles = StyleSheet.create({
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
