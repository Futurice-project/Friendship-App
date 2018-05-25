import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, View } from 'react-native';
import rest from '../../../utils/rest';
import { connect } from 'react-redux';
import EditTagsList from '../../../components/EditTagsList';

const mapDispatchToProps = dispatch => ({
  getUserTags: userId => dispatch(rest.actions.tagsForUser.get({ userId })),
});

const mapStateToProps = state => ({
  userTags: state.tagsForUser,
});

class EditYeahsAndNahsScreen extends Component {
  state = {
    yeahs: [],
    nahs: [],
  };

  componentWillMount() {
    const { userId } = this.props;
    this.props.getUserTags(userId).then(data => this.prepareData(data));
  }

  prepareData = userTags => {
    let yeahs = [];
    let nahs = [];
    userTags.map(tag => {
      tag.love ? yeahs.push(tag.id) : nahs.push(tag.id);
    });
    this.props.updateTags(yeahs, nahs);
    this.setState({ yeahs, nahs });
  };

  getTagPos = (tagId, tags) => {
    for (let i = 0; i < tags.length; i++) {
      if (tags[i] === tagId) {
        return i;
      }
    }
    return -1;
  };

  updateTags = (tag, oldState) => {
    let tagPos;
    let tmpYeahs = this.state.yeahs;
    let tmpNahs = this.state.nahs;
    switch (oldState) {
      case -1:
        tagPos = this.getTagPos(tag.id, tmpNahs);
        tmpNahs.splice(tagPos, 1);
        break;
      case 1:
        tagPos = this.getTagPos(tag.id, tmpYeahs);
        tmpYeahs.splice(tagPos, 1);
        tmpNahs.push(tag.id);
        break;
      default:
        tmpYeahs.push(tag.id);
    }
    this.props.updateTags(tmpYeahs, tmpNahs);
    this.setState({ yeahs: tmpYeahs, nahs: tmpNahs });
  };

  render() {
    const { userTags } = this.props;
    const { yeahs, nahs } = this.state;

    if (userTags.loading || !userTags.sync || !yeahs || !nahs) {
      return <ActivityIndicator />;
    }

    return (
      <EditTagsList
        updateTags={this.updateTags}
        selectedYeahs={yeahs}
        selectedNahs={nahs}
      />
    );
  }
}

EditYeahsAndNahsScreen.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(
  EditYeahsAndNahsScreen,
);
