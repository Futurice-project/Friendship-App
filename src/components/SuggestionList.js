import React from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';

import rest from '../utils/rest';

const styles = {
  suggestionCard: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 75,
    margin: 2,
  },
  iconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export class SuggestionList extends React.Component {
  // componentDidMount() {
  //   this.props.usersByPage(0);
  // }

  keyExtractor = (item, index) => index;
  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.suggestionCard}
        onPress={() => this.props.openChatRequest(item)}
      >
        <View style={styles.iconWrapper}>
          <Text style={{ fontSize: 20 }}>{item.emoji}</Text>
        </View>
        <Text style={{ fontSize: 12, color: '#4a4a4a', margin: 2 }}>
          {item.username}
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    if (!this.props.existingChatRooms) {
      return <ActivityIndicator />;
    }
    const exsitingUsers = this.props.existingChatRooms.map(
      user => user.receiver.id,
    );
    const suggestedUsers = this.props.suggestionUsers.filter(
      user => exsitingUsers.indexOf(user.id) < 0,
    );
    return (
      <FlatList
        data={suggestedUsers}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        style={{ marginTop: 10, height: 50 }}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    );
  }
}

const mapStateToProps = state => ({
  currentUserId: state.auth.data.decoded ? state.auth.data.decoded.id : null,
  suggestionUsers: state.usersByPage.data.data,
});

const mapDispatchToProps = dispatch => ({
  usersByPage: number => {
    dispatch(rest.actions.usersByPage({ number }));
  },
  openChatRequest: user =>
    dispatch(
      NavigationActions.navigate({
        routeName: 'ChatRequest',
        params: { user },
      }),
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(SuggestionList);
