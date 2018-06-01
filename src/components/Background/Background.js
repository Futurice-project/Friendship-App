import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View } from 'react-native';
import { colors } from '../../styles';
import styles from './styles';

class Background extends Component {
  render() {
    const { children, color, scrollable } = this.props;

    let backgroundColor;

    switch (color) {
      case 'blue':
        backgroundColor = colors.DARK_BLUE;
        break;
      case 'light_grey':
        backgroundColor = colors.LIGHT_GREY;
        break;
      case 'grey':
        backgroundColor = colors.MEDIUM_GREY;
        break;
    }

    return scrollable ? (
      <ScrollView
        contentContainerStyle={[styles.scrollableContent]}
        style={{ backgroundColor }}
      >
        {children}
      </ScrollView>
    ) : (
      <View style={[styles.background, { backgroundColor }]}>{children}</View>
    );
  }
}

Background.propTypes = {
  color: PropTypes.string,
  scrollable: PropTypes.bool,
  color: PropTypes.string,
};

Background.defaultProps = {
  color: 'blue',
  scrollable: false,
};

export default Background;
