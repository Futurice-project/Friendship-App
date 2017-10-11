import React from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import { PopUpMenuCard, TouchableHighlightButton } from './Layout';

class PopUpMenu extends React.Component {
  render() {
    return (
      <PopUpMenuCard popup={this.props.popup}>
        <TouchableHighlightButton
          label={'View Profile'}
          onPress={this.props.onViewProfile}
        />
        <TouchableHighlightButton
          label={'Delete'}
          onPress={this.props.onDelete}
        />
        <TouchableHighlightButton
          label={'Block'}
          onPress={this.props.onBlock}
        />
      </PopUpMenuCard>
    );
  }
}
export default PopUpMenu;
