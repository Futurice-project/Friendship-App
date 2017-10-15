import React from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import NavigationBackgroundAsset from '../../assets/drawable-mdpi/combined_shape_copy_2.png';

import { FlexRow } from './Layout';
import { Description } from './Text';
import styled from 'styled-components/native';

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  openProfile: (personId, personName) =>
    dispatch(
      NavigationActions.navigate({
        routeName: 'ProfileUser',
        params: { personId, personName },
      }),
    ),
});

class Person extends React.Component {
  renderBox = () => (
    <View style={styles.topPart}>
      <View style={{ flex: 70 }}>
        <Description style={styles.topText}>
          {this.props.data.description}
        </Description>
      </View>
      <FlexRow style={styles.bottomPart}>
        {/* with flex:1 long username don't go exceed the bottom part  */}

        <View style={styles.viewBottom}>
          <View style={styles.whiteCircle}>
            <Text style={styles.emoji}>{this.props.data.emoji}</Text>
          </View>

          <TouchableOpacity
            style={styles.nameView}
            onPress={() =>
              this.props.openProfile(
                this.props.data.id,
                this.props.data.username,
              )}
          >
            <Text style={styles.textName}>{this.props.data.username}</Text>
          </TouchableOpacity>
        </View>

        <Text style={{ fontSize: 12, marginTop: 5 }}>
          {' '}
          Compatible?
          <Text style={{ fontWeight: 'bold' }}>
            {' '}
            {this.props.data.compatibility}
          </Text>
        </Text>
      </FlexRow>
    </View>
  );

  renderLine = () => (
    <FlexRow style={styles.listItem}>
      <View style={styles.viewBottom}>
        <View>
          <Text style={styles.listEmoji}>{this.props.data.emoji}</Text>
        </View>

        <TouchableOpacity
          style={styles.nameView}
          onPress={() => this.props.openProfile(this.props.data.userId)}
        >
          <Text style={styles.listName}>
            {this.props.data.username} {this.props.data.love ? '<3' : '</3'}
          </Text>
        </TouchableOpacity>
      </View>
    </FlexRow>
  );

  render = () => (this.props.box ? this.renderBox() : this.renderLine());
}

const styles = StyleSheet.create({
  viewBottom: {
    flexDirection: 'row',
  },
  nameView: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 60,
  },
  textName: {
    fontSize: 20,
    /*    fontFamily: 'NunitoSans-Light', */
  },
  topPart: {
    height: 300,
    width: 200,
    marginLeft: 20,
    backgroundColor: '#939795',
    borderRadius: 3,
  },
  topText: {
    color: 'white',
    maxHeight: 130,
    marginVertical: 30,
    marginHorizontal: 20,
    lineHeight: 21,
    fontSize: 18,
    /*    fontFamily: 'Avenir', */
  },
  bottomPart: {
    width: 200,
    padding: 10,
    backgroundColor: '#E8E9E8',
    flex: 30,
    alignSelf: 'flex-end',
    flexDirection: 'column',
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },
  whiteCircle: {
    width: 66,
    height: 66,
    borderRadius: 132 / 2,
    backgroundColor: 'white',
    alignItems: 'center',
    marginRight: 10,
    flex: 40,
  },
  emoji: {
    backgroundColor: 'transparent',
    marginTop: 5,
    fontSize: 47,
  },
  listItem: {
    // alignItems: 'center',
    // alignSelf: 'center',
    // justifyContent: 'center',
    margin: 0,
    height: 70,
  },
  listName: {
    justifyContent: 'flex-start',
    fontSize: 20,
    fontWeight: '400',
  },
  listEmoji: {
    backgroundColor: 'transparent',
    margin: 5,
    marginHorizontal: 10,
    alignSelf: 'center',
    fontSize: 47,
    alignItems: 'center',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Person);
