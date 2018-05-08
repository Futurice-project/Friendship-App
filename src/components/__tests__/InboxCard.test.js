import React from 'react';
import 'react-native';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import InboxCard from '../InboxCard';

describe('InboxCard', () => {
  const mockStore = configureMockStore([thunk]);

  const chatrooms = [
    {
      id: 26,
      creator: {
        id: 1,
        username: 'testCreator',
        emoji: '��🇭',
      },
      receiver: {
        id: 2,
        username: 'testReceiver',
        emoji: '��🇭',
      },
      messages: [
        {
          id: 10,
          text_message: 'Testing Hello Two',
          chat_time: '2018-05-04T08:50:22.793+03:00',
          user_id: 1,
          chatroom_id: 26,
          read: true,
        },
        {
          id: 10,
          text_message: 'Testing Hello Two',
          chat_time: '2018-05-04T08:50:22.793+03:00',
          user_id: 1,
          chatroom_id: 26,
          read: false,
        },
      ],
    },
  ];

  const initialState = {
    chatRoomsWithUserId: {
      data: {
        data: chatrooms,
      },
    },
    auth: {
      data: {
        decoded: {
          id: 1,
        },
      },
    },
  };

  test('renders correctly', () => {
    const wrapper = shallow(<InboxCard />, {
      context: { store: mockStore(initialState) },
    });
    wrapper.setProps({ data: chatrooms });
    expect(wrapper).toMatchSnapshot();
  });
});
