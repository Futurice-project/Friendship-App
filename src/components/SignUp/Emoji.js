import { emojis } from '../../../assets/misc/emojis';
import styled from 'styled-components/native/index';
import React from 'react';
import SignUpEmoji from './SignUpEmoji';

export default class Emoji extends React.Component {
  state = {
    emoji: '',
  };

  updateEmoji = newEmoji => {
    this.setState({ emoji: newEmoji });
  };

  render() {
    const { input } = this.props;
    return (
      <ScrollViewPhoto
        contentContainerStyle={styles.scrollViewMoodContainer}
        showsHorizontalScrollIndicator={false}
        horizontal
        style={{ height: 70, marginTop: 22 }}
      >
        {this.renderEmojis(input)}
      </ScrollViewPhoto>
    );
  }

  checkEmoji(e) {
    return e === this.state.emoji ? '' : e;
  }

  renderEmojis(input) {
    return emojis.map(emoji => (
      <SignUpEmoji
        updateEmoji={e => {
          let result = this.checkEmoji(e);
          input.onChange(result);
          this.updateEmoji(result);
        }}
        selectedEmoji={input.emoji}
        key={emoji}
        emoji={emoji}
        selected={this.state.emoji === emoji}
      />
    ));
  }
}

const ScrollViewPhoto = styled.ScrollView`margin-top: 11;`;

const styles = {
  scrollViewMoodContainer: {
    justifyContent: 'space-around',
    height: 70,
    paddingRight: 23,
    paddingLeft: 23,
  },
};
