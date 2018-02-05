import React from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

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

  keyExtractor = item => item.id;
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
    return (
      <FlatList
        data={this.props.suggestionUsers}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        style={{ height: 80, marginTop: 10 }}
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
