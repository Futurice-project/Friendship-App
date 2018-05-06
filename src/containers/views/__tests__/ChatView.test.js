import React from 'react';
import 'react-native';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import ChatView from '../Chat/ChatView';

describe('ChatView', () => {
  const mockStore = configureMockStore([thunk]);

  const messages = [
    {
      id: 23,
      text_messages: 'Hello',
      chat_time: '05-04-2018',
      user_id: 3,
      chatroom_id: 4,
      read: false,
    },
    {
      id: 24,
      text_messages: 'How are you',
      chat_time: '05-05-2018',
      user_id: 4,
      chatroom_id: 4,
      read: true,
    },
  ];

  const initialState = {
    auth: {
      data: {
        decoded: {
          id: 1,
        },
      },
    },
    chatRoomMessages: {
      data: {
        id: 4,
        creator: 'test',
        receiver: 'test',
        message: messages,
      },
    },
  };
  test('render correctly', () => {
    const store = mockStore(initialState);
    const wrapper = shallow(<ChatView store={store} />);

    expect(wrapper).toMatchSnapshot();
  });
});
