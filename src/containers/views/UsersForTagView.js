import React from 'react';
import { ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import rest from '../../utils/rest';
import TabForTags from '../../components/TabForTags';
import { ViewContainerLight } from '../../components/Layout/Layout';

const mapStateToProps = state => ({
  userlistForTag: state.userlistForTag,
});

const mapDispatchToProps = dispatch => ({
  refreshUserlistForTag: tagId =>
    dispatch(rest.actions.userlistForTag.get({ tagId })),
});

class UsersForTagView extends React.Component {
  static navigationOptions = {
    title: 'Search for users with tag ',
  };

  state = {
    loaded: false,
  };

  componentDidMount() {
    this.fetchUserListForTag();
  }

  componentWillReceiveProps(nextProps) {
    this.setStateWithTags(nextProps);
  }

  fetchUserListForTag = () => {
    let tagId = null;
    if (this.props.navigation.state.params) {
      tagId = this.props.navigation.state.params.tagId;
      this.props.refreshUserlistForTag(tagId);
    }
  };

  setStateWithTags = nextProps => {
    if (!nextProps.userlistForTag.loading) {
      this.setState({
        loaded: true,
        usersLove: nextProps.userlistForTag.data.filter(e => e.love === true),
        usersHate: nextProps.userlistForTag.data.filter(e => e.love === false),
      });
    }
  };

  render = () => {
    if (!this.state.loaded) {
      return <ActivityIndicator />;
    }

    return (
      <ViewContainerLight style={{ backgroundColor: '#faf6f0' }}>
        <TabForTags
          usersHate={this.state.usersHate}
          usersLove={this.state.usersLove}
        />
      </ViewContainerLight>
    );
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersForTagView);
