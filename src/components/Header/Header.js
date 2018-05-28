import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import styles from './styles';
import { colors } from '../../styles';

class Header extends Component {
  render() {
    const {
      color,
      leftComponent,
      rightComponent,
      title,
      titleComponent,
    } = this.props;

    let backgroundColor;
    switch (color) {
      case 'dark':
        backgroundColor = colors.DARK_BLUE;
        break;
      case 'light':
        backgroundColor = colors.LIGHT_GREY;
        break;
      case 'transparent':
        backgroundColor = 'transparent';
    }

    return (
      <View style={[styles.header, { backgroundColor }]}>
        {leftComponent}
        <Text>{title}</Text>
        {titleComponent}
        {rightComponent}
      </View>
    );
  }
}

Header.propTypes = {
  color: PropTypes.string,
  leftComponent: PropTypes.element,
  rightComponent: PropTypes.element,
  title: PropTypes.string,
};

Header.defaultProps = {
  color: 'dark',
};

export default Header;
