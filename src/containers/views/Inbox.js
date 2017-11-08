import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { IconImage } from '../../components/Layout';

import rest from '../../utils/rest';
import RoundTab from '../../components/RoundTab';
import InboxCard from '../../components/InboxCard';

export class Inbox extends React.Component {
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

  state = {};

  componentDidMount() {
    this.props.chatRoomsWithUserId(11);
  }

  keyExtractor = item => item.chatroomid;
  renderItem = ({ item }) => {
    return <InboxCard data={item} />;
  };

  render() {
    console.log(this.props.currentUserId);
    return (
      <View style={{ flex: 1, marginTop: 100 }}>
        <RoundTab tint="#ffffff" title="CHATS" fontSize="12" />
        <FlatList
          data={this.props.chatrooms}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          style={{ flex: 1, backgroundColor: 'white' }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  currentUserId: state.auth.data.decoded ? state.auth.data.decoded.id : null,
  chatrooms: state.chatRoomsWithUserId.data.data,
});

const mapDispatchToProps = dispatch => ({
  chatRoomsWithUserId: id => {
    dispatch(rest.actions.chatRoomsWithUserId({ id }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);
