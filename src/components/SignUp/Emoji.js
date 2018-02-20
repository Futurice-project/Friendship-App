import { emojis } from '../../../assets/misc/emojis';
import styled from 'styled-components/native/index';
import React from 'react';
import SignUpEmoji from './SignUpEmoji';

export default function Emoji(props) {
  const { input } = props;
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

renderEmojis = input => {
  return emojis.map(emoji => (
    <SignUpEmoji
      updateEmoji={input.onChange} //() => this.updateEmoji(emoji, input)
      selectedEmoji={input.emoji} //this.props.signup.userInfos.emoji
      key={emoji}
      emoji={emoji}
    />
  ));
};

updateEmoji = (emoji, input) => {
  /*this.props.updateUserInfos(
    emoji !== this.props.signup.userInfos.emoji ? emoji : null,
    UPDATE_EMOJI,
  );*/
};

const ScrollViewPhoto = styled.ScrollView`margin-top: 11;`;

const styles = {
  scrollViewMoodContainer: {
    justifyContent: 'space-around',
    height: 70,
    paddingRight: 23,
    paddingLeft: 23,
  },
};
