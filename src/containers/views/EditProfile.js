import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class EditProfile extends Component {
  render() {
    return (
      <KeyboardAwareScrollView
        extraHeight={30}
        enableResetScrollToCoords={false}
        enableOnAndroid={true}
        enableAutoAutomaticScroll={true}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 30,
            marginLeft: 20,
            marginRight: 20,
          }}
        >
          <TouchableOpacity onPress={() => this.props.closeEditForm()}>
            <Text style={styles.headerText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onSubmit()}>
            <Text style={styles.headerText}>SAVE</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = {
  headerText: {
    fontFamily: 'NunitoSans-SemiBold',
    fontSize: 20,
    color: '#ff8a65',
  },
};

export default EditProfile;
