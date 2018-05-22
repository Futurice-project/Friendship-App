import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { colors } from '../../styles';
import { Dimensions, Image, TouchableOpacity, View } from 'react-native';
import wave from '../../../assets/img/curve/curve.png';
import styles from './styles';

class Footer extends Component {
  render() {
    const { children, color, activeOpacity, onPress } = this.props;
    const { width } = Dimensions.get('window');

    let tintColor;

    switch (color) {
      case 'orange':
        tintColor = colors.ORANGE;
        break;
    }

    return (
      <TouchableOpacity
        style={styles.footer}
        onPress={onPress}
        activeOpacity={activeOpacity}
      >
        <Image
          source={wave}
          style={[
            styles.footerWave,
            {
              width,
              tintColor,
            },
          ]}
        />
        <View
          style={[
            styles.footerContent,
            {
              backgroundColor: tintColor,
              width,
            },
          ]}
        >
          {children}
        </View>
      </TouchableOpacity>
    );
  }
}

Footer.propTypes = {
  color: PropTypes.string,
  onPress: PropTypes.func,
  activeOpacity: PropTypes.number,
};

Footer.defaultProps = {
  color: 'orange',
  onPress: () => {},
  activeOpacity: 1,
};

export default Footer;
