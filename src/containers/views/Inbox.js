import React from 'react';
import { connect } from 'react-redux';
import { View, FlatList } from 'react-native';
import { IconImage } from '../../components/Layout';
import InboxCard from '../../components/InboxCard';
import rest from '../../utils/rest';

export class InboxView extends React.Component {
  static navigationOptions = {
    title: 'Inbox',
    header: {
      visible: false,
    },
    tabBarIcon: ({ tintColor }) => (
      <IconImage
        source={require('../../../assets/inbox.png')}
        tintColor={tintColor}
      />
    ),
  };

  state = {
    currentUser: 'thunghiem',
    data: [],
  };

  componentDidMount() {
    //this.props.getChatRooms();
    this.fetchData();
  }

  fetchData = async () => {
    try {
      let response = await fetch(
        'https://chat-app-thunghiem.herokuapp.com/chatrooms',
      );
      let data = await response.json();

      this.setState({ data });
    } catch (error) {
      console.error(error);
    }
  };

  keyExtractor = item => item._id;
  renderItem = ({ item }) => {
    const { members, messages, _id } = item;
    const receiver = members.filter(i => i.name !== this.state.currentUser);
    const lastMessage = messages[messages.length - 1];
    return (
      <InboxCard
        name={receiver[0].name}
        avatar={receiver[0].avatar}
        message={lastMessage.text}
        roomID={_id}
        date={lastMessage.date}
      />
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.state.data}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          style={{ flex: 1 }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  chatRooms: state.chatRooms.data.data,
});

const mapDispatchToProps = dispatch => ({
  getChatRooms: () => {
    dispatch(rest.actions.chatRooms());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(InboxView);
