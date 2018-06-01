import React from 'react';
import { connect } from 'react-redux';

import rest from '../../../utils/rest';
import Report from '../Report/Report';
import { NavigationActions } from 'react-navigation';
import Background from '../../../components/Background';
import ChatList from '../../../components/ChatList';

const mapStateToProps = state => ({
  currentUserId: state.auth.data.decoded ? state.auth.data.decoded.id : null,
  chatrooms: state.chatRoomsWithUserId.data,
  chatroomRefreshState: state.chatRoomsWithUserId,
});

const mapDispatchToProps = dispatch => ({
  chatRoomsWithUserId: id => {
    dispatch(rest.actions.chatRoomsWithUserId({ id }));
  },
  goToPeopleView: () =>
    dispatch(NavigationActions.navigate({ routeName: 'People' })),
});

export class ChatInbox extends React.Component {
  state = { showReport: false };

  render() {
    if (this.state.showReport) {
      return <Report />;
    }

    return (
      <Background color="grey">
        <ChatList />
      </Background>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatInbox);
