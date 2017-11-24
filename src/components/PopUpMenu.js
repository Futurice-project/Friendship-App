import React from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import { Icon } from 'react-native-elements';
import {
  Menu,
  MenuContext,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';

import Modal from 'react-native-modal';
import { PopUpMenuCard, TouchableHighlightButton } from './Layout';

class PopUpMenu extends React.Component {
  closeMenu() {
    console.log(this);
    this.menu.close();
  }
  onRef = r => {
    this.menu = r;
  };
  renderProfile = () => (
    <PopUpMenuCard>
      <MenuContext>
        <Menu
          ref={this.onRef}
          renderer={renderers.SlideInMenu}
          onBackdropPress={() => this.closeMenu()}
        >
          <MenuTrigger customStyles={styles.triggerStyles}>
            <Icon name="more-vert" />
          </MenuTrigger>
          <MenuOptions customStyles={styles.optionsStyles}>
            <MenuOption
              value={1}
              onSelect={() => alert('navigate to send message')}
              text="Follow Profile"
            />
            <MenuOption
              value={2}
              onSelect={() => alert('navigate to send message')}
              text="Chat"
            />
            <MenuOption
              onSelect={() => alert('navigate to send message')}
              text="Invite to Group"
            />
            <MenuOption
              onSelect={() => alert('navigate to send message')}
              text="Invite to Happening"
            />
            <MenuOption text="Close" />
            <MenuOption onSelect={this.props.isReportVisible} text="Report" />
          </MenuOptions>
        </Menu>
      </MenuContext>
    </PopUpMenuCard>
  );

  renderChatroom = () => (
    <PopUpMenuCard>
      <MenuContext>
        <Menu
          ref={this.onRef}
          renderer={renderers.SlideInMenu}
          onBackdropPress={() => this.closeMenu()}
        >
          <MenuTrigger customStyles={styles.triggerStyles}>
            <Icon name="more-vert" />
          </MenuTrigger>
          <MenuOptions customStyles={styles.optionsStyles}>
            <MenuOption
              value={1}
              onSelect={() => alert('View prof')}
              text="View Profile"
            />
            <MenuOption
              value={2}
              onSelect={() => alert('navigate to send message')}
              text="Invite to squad"
            />
            <MenuOption
              onSelect={() => alert('navigate to send message')}
              text="Invite to happening"
            />
            <MenuOption
              onSelect={() => alert('navigate to send message')}
              text="Block"
            />
            <MenuOption text="Close" />
            <MenuOption onSelect={this.props.isReportVisible} text="Report" />
          </MenuOptions>
        </Menu>
      </MenuContext>
    </PopUpMenuCard>
  );
  render = () =>
    this.props.chat ? this.renderChatroom() : this.renderProfile();
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
      backgroundColor: '#2a343c',
      marginLeft: -185,
      marginTop: 270,
      width: 220,
      borderWidth: 0,
    },
    optionText: {
      color: '#ffffff',
      fontSize: 18,
    },
    optionWrapper: {
      padding: 11,
    },
  },
  touchableHighlightProps: {
    activeOpacity: 0.5,
    underlayColor: '4a4a4a',
  },
};
export default PopUpMenu;
