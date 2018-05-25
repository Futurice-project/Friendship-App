import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import { colors } from '../../styles';

class Button extends Component {
  render() {
    const { primary, text, width, onPress, header, color } = this.props;

    let style = primary
      ? styles.button
      : header ? styles.headerButton : styles.buttonSecondary;
    let buttonTextColor;

    switch (color) {
      case 'orange':
        buttonTextColor = colors.ORANGE;
        break;
      case 'white':
        buttonTextColor = colors.WHITE;
        break;
    }

    let buttonWidth;

    switch (width) {
      case 'sm':
        buttonWidth = 100;
        break;
      case 'md':
        buttonWidth = 150;
        break;
      case 'xl':
        buttonWidth = 200;
        break;
      case 'noFixedWidth':
        break;
    }

    return (
      <TouchableOpacity
        style={[style, { width: buttonWidth }]}
        onPress={onPress}
      >
        {this.props.icon ? (
          this.props.icon
        ) : (
          <Text style={[styles.text, { color: buttonTextColor }]}>{text}</Text>
        )}
      </TouchableOpacity>
    );
  }
}

Button.propTypes = {
  width: PropTypes.string,
  text: PropTypes.string,
  primary: PropTypes.bool,
  color: PropTypes.string,
};

Button.defaultProps = {
  text: 'A Button',
  primary: false,
  width: 'noFixedWidth',
  color: 'orange',
  onPress: () => {},
};

export default Button;
