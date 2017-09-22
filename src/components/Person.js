import React from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { FlexRow } from './Layout';
import styled from 'styled-components/native';

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  openProfile: personId =>
    dispatch(
      NavigationActions.navigate({
        routeName: 'ProfileUser',
        params: { personId },
      }),
    ),
});

class Person extends React.Component {
  render = () => (
    <View style={styles.topPart}>
      <View style={{ flex: 70 }}>
        <Text style={styles.topText}>{this.props.data.description}</Text>
      </View>

      <FlexRow style={styles.bottomPart}>
        {/* with flex:1 long username don't go exceed the bottom part  */}

        <View style={{ flexDirection: 'row' }}>
          <View style={styles.whiteCircle}>
            <Text style={styles.emoji}>{this.props.data.emoji}</Text>
          </View>

          <View style={styles.nameView}>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => this.props.openProfile(this.props.data.id)}
            >
              <Text style={styles.TextName}>{this.props.data.username}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.TextCompatibility}>
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
}

const styles = StyleSheet.create({
  nameView: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },

  TextName: {
    fontSize: 20,
    /*    fontFamily: 'NunitoSans-Light', */
  },
  TextCompatibility: {
    fontSize: 18,
    /*    fontFamily: 'NunitoSans-Light', */
  },

  topPart: {
    height: 300,
    width: 200,
    marginLeft: 20,
    backgroundColor: '#939795',
  },

  topText: {
    color: 'white',
    marginTop: 5,
    marginLeft: 10,
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
  },
  whiteCircle: {
    width: 66,
    height: 66,
    borderRadius: 132 / 2,
    backgroundColor: 'white',
    marginLeft: -60,
  },
  emoji: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    fontSize: 47,
    alignItems: 'center',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Person);
