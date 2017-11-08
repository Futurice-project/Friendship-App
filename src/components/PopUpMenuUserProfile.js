import React from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import { Icon } from 'react-native-elements';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';

import Modal from 'react-native-modal';
import { PopUpMenuCard, TouchableHighlightButton } from './Layout';

class PopUpMenuUserProfile extends React.Component {
  render() {
    return (
      <PopUpMenuCard>
        <Menu renderer={renderers.SlideInMenu}>
          <MenuTrigger customStyles={styles.triggerStyles}>
            <Icon name="more-vert" />
          </MenuTrigger>
          <MenuOptions customStyles={styles.optionsStyles}>
            <MenuOption
              onSelect={() => alert('navigate to send message')}
              text="Send message"
            />
            <MenuOption onSelect={this.props.isReportVisible}>
              <Text>Report</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </PopUpMenuCard>
    );
  }
}

const styles = {
  popupText: {
    fontFamily: 'NunitoSans-SemiBold',
    fontSize: 20,
    color: '#ff8a65',
  },
  triggerStyles: {
    triggerWrapper: {
      paddingTop: 10,
      paddingBottom: 10,
      paddingRight: 10,
    },
    triggerTouchable: {
      // underlayColor: '#ff8a65',
      // activeOpacity: 70,
    },
  },
  optionsStyles: {
    optionsContainer: {
      backgroundColor: '#e8e9e8',
      marginTop: 75,
      width: 120,
      borderWidth: 0,
    },
    optionText: {
      color: '#60686d',
    },
    optionWrapper: {
      padding: 10,
    },
  },
  touchableHighlightProps: {
    activeOpacity: 0.5,
    underlayColor: '4a4a4a',
  },
};
export default PopUpMenuUserProfile;
