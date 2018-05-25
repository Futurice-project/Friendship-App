import React, { Component } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import { colors } from '../../styles';

class Input extends Component {
  state = {
    showPassword: false,
  };

  togglePassword = () => {
    this.setState(prevState => {
      return { showPassword: !prevState.showPassword };
    });
  };

  render() {
    const { title, color, secureTextEntry } = this.props;
    const { showPassword } = this.state;

    let titleColor;
    switch (color) {
      case 'white':
        titleColor = colors.WHITE;
        break;
    }

    let passwordIcon = showPassword
      ? require('../../../assets/show_password.png')
      : require('../../../assets/hidden_password.png');

    return (
      <View style={[styles.wrapper, this.props.style]}>
        <Text style={[styles.title, { color: titleColor }]}>{title}</Text>
        <TextInput
          style={[styles.textInput]}
          underlineColorAndroid="transparent"
          placeholderTextColor={colors.PLACEHOLDER}
          onChangeText={value => this.props.handleChange(value)}
          secureTextEntry={secureTextEntry ? !showPassword : null}
          {...this.props.inputProps}
        />
        {secureTextEntry ? (
          <TouchableOpacity
            style={[styles.passwordIcon]}
            onPress={this.togglePassword}
          >
            <Image source={passwordIcon} />
          </TouchableOpacity>
        ) : null}
        <View style={[styles.horizontalLine]} />
      </View>
    );
  }
}

Input.propTypes = {
  inputProps: PropTypes.object,
  title: PropTypes.string,
  color: PropTypes.string,
};

Input.defaultProps = {
  color: 'white',
};

export default Input;
