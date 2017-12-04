import React from 'react';
import { FlatList, View, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { ListItem } from 'react-native-elements';
import rest from '../../utils/rest';
import TabForTags from '../../components/TabForTags';
import {
  ViewContainerLight,
  Centered,
  FlexRow,
  FullscreenCentered,
} from '../../components/Layout';
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

  keyExtractor = item => item.userId;
  renderItem = ({ item }) => <Person data={item} />;

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

  componentDidMount() {
    const tagId = this.props.navigation.state.params
      ? this.props.navigation.state.params.tagId
      : null;
    this.props.refreshUserlistForTag(tagId);
  }

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
