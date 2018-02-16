import React from 'react';
import { TextInput, View } from 'react-native';

/**
 * to be wrapped with redux-form Field component
 */
export default function MyTextInput(props) {
  const { input, meta, ...inputProps } = props;
  console.log(input);
  return (
    <View>
      <TextInput
        autoCorrect={false}
        returnKeyType="next"
        keyboardType="email-address"
        underlineColorAndroid="transparent"
        placeholderTextColor="#4a4a4a"
        placeholder="(NICK)NAME*"
        onChangeText={input.onChange}
        value={input.value}
        onSubmitEditing={() => {
          this._emailInput.focus();
        }}
      />
    </View>
  );
}
