import React from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Centered,
} from 'react-native';
import NavigationBackgroundAsset from '../../assets/drawable-mdpi/combined_shape_copy_2.png';

import { FlexRow } from './Layout';
import styled from 'styled-components/native';

const emojis = {
  burger: require('../../assets/emojis/burger.png'),
  cookies: require('../../assets/emojis/cookies.png'),
  eart: require('../../assets/emojis/eart.png'),
  ghost: require('../../assets/emojis/ghost.png'),
  happy: require('../../assets/emojis/happy.png'),
  lion: require('../../assets/emojis/lion.png'),
  panda: require('../../assets/emojis/panda.png'),
  pizza: require('../../assets/emojis/pizza.png'),
  star: require('../../assets/emojis/star.png'),
  tree: require('../../assets/emojis/tree.png'),
};

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

class Emoji extends React.Component {
  render = () => (
    <View style={styles.emojiView}>
      <Text style={styles.emojiView}>{this.props.data.key}</Text>

      <TouchableOpacity
        style={styles.whiteCircle}
        onPress={() => alert(this.props.data.key)}
      >
        <Image style={styles.imageStyle} source={emojis[this.props.data.key]} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  emojiView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  whiteCircle: {
    width: 70,
    height: 70,
    borderRadius: 140 / 2,
    backgroundColor: 'white',
    marginRight: 10,
    flex: 40,
  },
  imageStyle: {
    width: 47,
    height: 47,
    marginLeft: 11,
    marginTop: 11,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Emoji);
