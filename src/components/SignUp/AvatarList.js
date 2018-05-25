import { emojis } from '../../../assets/misc/emojis';
import styled from 'styled-components/native/index';
import React from 'react';
import Avatar from './Avatar';
import rest from '../../utils/rest';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => ({
  getAvatars: () => dispatch(rest.actions.avatars()),
});

const mapStateToProps = state => ({
  avatars: state.avatars,
});

class AvatarList extends React.Component {
  state = {
    avatar: '',
  };

  componentWillMount() {
    this.props.getAvatars();
  }

  updateAvatar = newAvatar => {
    this.setState({ avatar: newAvatar });
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
        {this.renderAvatars(input)}
      </ScrollViewPhoto>
    );
  }

  checkAvatar(e) {
    return e === this.state.avatar ? '' : e;
  }

  _keyExtractor = (item, index) => `avatarList-${item.id}`;

  renderAvatars(input) {
    return this.props.avatars.data.map(avatar => (
      <Avatar
        updateAvatar={newAvatar => {
          let result = this.checkAvatar(newAvatar);
          input.onChange(result);
          this.updateAvatar(result);
        }}
        selectedAvatar={input.avatar}
        key={this._keyExtractor(avatar)}
        avatar={avatar.uri}
        selected={this.state.avatar === avatar.uri}
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

export default connect(mapStateToProps, mapDispatchToProps)(AvatarList);
