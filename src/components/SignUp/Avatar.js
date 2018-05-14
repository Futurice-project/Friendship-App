import React from 'react';
import styled from 'styled-components/native';
import { Image, TouchableOpacity } from 'react-native';

export default class Avatar extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.updateAvatar(this.props.avatar)}
      >
        <AvatarContainer
          style={{
            backgroundColor: this.props.selected ? '#ff8a65' : '#ffffff',
          }}
        >
          <Image source={{ uri: this.props.avatar }} style={styles.avatars} />
        </AvatarContainer>
      </TouchableOpacity>
    );
  }
}

export const AvatarContainer = styled.View`
  height: 70;
  width: 70;
  background-color: #ffffff;
  border-radius: 35;
  justify-content: center;
  align-items: center;
  margin-right: 12;
`;

const styles = {
  avatars: {
    height: 60,
    width: 60,
  },
};
