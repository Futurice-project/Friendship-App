import React, { PureComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import Tag from '../Tags';
import ParticipantList from './ParticipantList';
import Personality from '../SignUp/Personality';

const ButtonOption = styled.View`
  flex: 1;
  align-items: center;
  marginBottom: 30;
  marginTop: 30;
`;

export default class EventBottomPart extends PureComponent {
  renderJoinButton() {
    return (
      <View style={{ backgroundColor: '#ffffff' }}>
        <ButtonOption>
          <TouchableOpacity
            onPress={this._onPressButton}
            style={styles.buttonStyle}
          >
            <Text style={styles.textButtonStyle}>Join this</Text>
          </TouchableOpacity>
        </ButtonOption>
      </View>
    );
  }

  renderPersonalities = () => {
    return this.props.personalities.data.rows.map(personality => {
      return (
        <Personality
          key={personality.name}
          title={personality.name}
          image={personality.name}
          amount={personality.Number_of_Personalities}
          profile={true}
        />
      );
    });
  };

  render = () => {
    const yeahs = [];
    this.props.tags.data.data.map(tag => {
      if (tag.love) {
        yeahs.push(tag);
      }
    });
    const naahs = [];
    this.props.tags.data.data.map(tag => {
      if (!tag.love) {
        naahs.push(tag);
      }
    });

    return (
      <View style={{ backgroundColor: '#ffffff' }}>
        {this.renderJoinButton()}
        <ParticipantList participants={this.props.participants} />
        <Text style={styles.groupTextStyle}>GROUP PERSONALITIES</Text>
        <View style={styles.personalitiesView}>
          {this.renderPersonalities()}
        </View>
        <Text style={styles.groupTagsTextStyle}>TOP YEAHS</Text>
        <View style={styles.tagList}>
          {yeahs.map((tag, index) => (
            <Tag key={index} data={tag} amount={tag.count} />
          ))}
        </View>
        <Text style={styles.groupTagsTextStyle}>TOP NAAHS</Text>
        <View style={styles.tagList}>
          {naahs.map((tag, index) => (
            <Tag key={index} data={tag} amount={tag.count} dark />
          ))}
        </View>
        {this.renderJoinButton()}
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
  groupTextStyle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#4a4a4a',
    marginLeft: 15,
    marginBottom: 15,
    marginTop: 25,
  },
  groupTagsTextStyle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#4a4a4a',
    marginLeft: 15,
    marginTop: 25,
  },
  personalitiesView: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
  },
  textButtonStyle: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2d4359',
  },
  buttonStyle: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: 241,
    height: 47,
    borderRadius: 34,
    backgroundColor: '#F9F6F1',
  },
});
