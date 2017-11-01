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
import {
  IconImage,
  MessageCard,
  ProfileIconCard,
  MessageContent,
  ViewContainerTop,
} from '../../components/Layout';
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
    currentUser: null,
    data: [],
    activeModal: -1,
    text: '',
  };

  componentDidMount() {
    //this.props.getChatRooms();
    //this.fetchData();
  }

  fetchData = async (user = this.state.currentUser) => {
    try {
      let response = await fetch(
        `https://chat-app-thunghiem.herokuapp.com/chatrooms/${user}/`,
      );
      let data = await response.json();
      data = data.reverse();
      this.setState({ data, currentUser: user });
    } catch (error) {
      console.error(error);
    }
  };

  createChatRoom = sentTo => {
    fetch(`https://chat-app-thunghiem.herokuapp.com/users/${sentTo}`)
      .then(response => response.json())
      .then(responseJson => {
        responseJson
          ? this.postNewroom(sentTo)
          : Alert.alert('Cannot Find User');
      })
      .catch(error => {
        console.error(error);
      });
  };

  postNewroom = sentTo => {
    fetch('https://chat-app-thunghiem.herokuapp.com/chatrooms', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: this.state.currentUser,
        receiver: sentTo,
      }),
    }).then(() => {
      this.fetchData();
    });
  };

  keyExtractor = item => item._id;
  renderItem = ({ item }) => {
    const { members, messages, _id } = item;
    const receiver = members.filter(i => i.name !== this.state.currentUser);
    const lastMessage = messages[messages.length - 1];
    return (
      <InboxCard
        name={receiver[0] ? receiver[0].name : this.state.currentUser}
        currentUser={this.state.currentUser}
        avatar={receiver[0] ? receiver[0].avatar : null}
        message={lastMessage ? lastMessage.text : 'Start conversation'}
        roomID={_id}
        date={lastMessage ? lastMessage.date : new Date().toISOString()}
      />
    );
  };

  openModal = number => {
    this.setState({ activeModal: number, text: '' });
  };

  signIn = () => {
    if (this.state.text !== '') {
      this.fetchData(this.state.text);
    }
    this.openModal(-1);
  };

  addChatroom = () => {
    this.createChatRoom(this.state.text);
    this.setState({ text: '' });
    this.openModal(-1);
  };

  renderButton = (onPressFuntion, text = 'Sign In', isButton) => {
    if (!this.state.currentUser || isButton) {
      return (
        <TouchableOpacity onPress={onPressFuntion} style={styles.button}>
          <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
      );
    }
    return (
      <Text style={{ textAlign: 'center', color: '#999', paddingTop: 5 }}>
        {`Signed in as: ${this.state.currentUser}`}
      </Text>
    );
  };

  renderModalContent = (onTextSubmit, placeholder, activeModal) => (
    <Modal isVisible={this.state.activeModal === activeModal}>
      <View style={styles.modalContent}>
        <View
          style={{ flex: 1, flexDirection: 'row', height: 20, marginTop: 20 }}
        >
          <TextInput
            style={{
              paddingLeft: 5,
              width: 200,
              height: 30,
              borderColor: 'rgba(0, 0, 0, 0.1)',
              borderWidth: 1,
              borderRadius: 5,
            }}
            placeholder={placeholder}
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
            onSubmitEditing={onTextSubmit}
          />
        </View>
        {this.renderButton(onTextSubmit, 'Submit', true)}
      </View>
    </Modal>
  );

  render() {
    return (
      <ViewContainerTop style={{ flex: 1 }}>
        {this.renderButton(() => this.openModal(0))}
        {this.renderModalContent(() => this.signIn(), 'Your username', 0)}
        {this.renderModalContent(
          () => this.addChatroom(),
          'Send to username',
          1,
        )}
        <FlatList
          data={this.state.data}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          style={{ flex: 1 }}
        />
        {this.state.currentUser ? (
          this.renderButton(() => this.openModal(1), 'Add Converstion', true)
        ) : null}
      </ViewContainerTop>
    );
  }
}

const styles = {
  button: {
    backgroundColor: '#6cc5c9',
    padding: 10,
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalContent: {
    height: 120,
    backgroundColor: 'white',
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  buttonText: {
    color: 'white',
  },
};

const mapStateToProps = state => ({
  chatRooms: state.chatRooms.data.data,
});

const mapDispatchToProps = dispatch => ({
  getChatRooms: () => {
    dispatch(rest.actions.chatRooms());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(InboxView);
