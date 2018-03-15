import React from 'react';
import { CheckBox } from 'react-native-elements';

export default class CheckBoxs extends React.Component {
  state = { check: false };

  _handlePress() {
    this.props.onIconPress();
    if (!this.state.check) {
      return this.setState({ check: true });
    }
    return this.setState({ check: false });
  }

  render() {
    return (
      <CheckBox
        title={this.props.title}
        textStyle={{
          color: '#2d4359',
          fontFamily: 'NunitoSans-Light',
          fontSize: 13,
          letterSpacing: 1.5,
        }}
        checkedColor="#839297"
        checkedIcon="circle"
        uncheckedIcon="circle-o"
        containerStyle={{
          backgroundColor: 'white',
          borderWidth: 0,
          padding: 0,
        }}
        onPress={() => this._handlePress()}
        checked={this.state.check}
      />
    );
  }
}
