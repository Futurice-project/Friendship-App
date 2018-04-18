import React from 'react';
import { TextInput, View } from 'react-native';

/**
 * to be wrapped with redux-form Field component
 */
export default class SignUpTextInput extends React.Component {
  render() {
    const { input } = this.props;
    return (
      <View>
        <TextInput
          autoCorrect={false}
          returnKeyType="next"
          keyboardType={this.props.keyboardType}
          secureTextEntry={this.props.secureTextEntry}
          underlineColorAndroid="transparent"
          placeholderTextColor="#4a4a4a"
          placeholder={this.props.placeholder}
          onChangeText={input.onChange}
          value={input.email}
          style={{ fontFamily: 'NunitoSans-SemiBold', fontSize: 18 }}
        />
      </View>
    );
  }
}
