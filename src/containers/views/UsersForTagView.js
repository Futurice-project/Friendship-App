import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { connect } from 'react-redux';
import rest from '../../utils/rest';
import TabForTags from '../../components/TabForTags';
import { ViewContainerLight } from '../../components/Layout/Layout';
import Person from '../../components/Person';

const mapStateToProps = state => ({
  userlistForTag: state.userlistForTag,
});

const mapDispatchToProps = dispatch => ({
  refreshUserlistForTag: tagId =>
    dispatch(rest.actions.userlistForTag.get({ tagId })),
});

class SearchList extends React.Component {
  static navigationOptions = {
    title: 'Search for users with tag ',
  };

  state = {
    loaded: false,
    tagId: this.props.navigation.state.params.tagId,
  };

  componentDidMount() {
    const tagId = this.props.navigation.state.params
      ? this.props.navigation.state.params.tagId
      : null;
    this.props.refreshUserlistForTag(tagId);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.userlistForTag.loading) {
      this.setState({
        loaded: true,
      });
      this.setState({
        usersLove: nextProps.userlistForTag.data.filter(e => e.love === true),
        usersHate: nextProps.userlistForTag.data.filter(e => e.love === false),
      });
    }
  }

  renderItem = ({ item }) => <Person data={item} />;
  keyExtractor = item => item.userId;

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#CED0CE',
        }}
      />
    );
  };

  render = () => {
    if (!this.state.loaded) {
      return <ActivityIndicator />;
    } else {
      return (
        <ViewContainerLight style={{ backgroundColor: '#faf6f0' }}>
          <TabForTags
            usersHate={this.state.usersHate}
            usersLove={this.state.usersLove}
          />
        </ViewContainerLight>
      );
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchList);
