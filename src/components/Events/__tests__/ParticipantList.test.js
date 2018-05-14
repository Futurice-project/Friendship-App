import React from 'react';
import { shallow } from 'enzyme';

import ParticipantList from '../ParticipantList';

describe('ParticipantList', () => {
  const props = {
    participants: {
      data: [
        {
          rows: [
            {
              id: 5,
              avatar:
                'https://friendship-app.s3.amazonaws.com/avatars/avatar1.png',
              username: 'test',
              hateCommon: '1',
              loveCommon: '2',
            },
          ],
        },
      ],
    },
  };

  test('renders correctlty', () => {
    const wrapper = shallow(<ParticipantList {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  test('flatlist use props to render items', () => {
    const wrapper = shallow(<ParticipantList {...props} />);

    const itemProps = wrapper
      .find('FlatList')
      .props()
      .renderItem({ item: props.participants.data[0].rows[0], index: 0 }).props;

    expect(wrapper.find('FlatList').props().data.length).toBe(1);
    expect(itemProps).toEqual({
      currentUser: undefined,
      avatar: '��',
      hateCommon: '1',
      id: 5,
      index: 0,
      isHost: false,
      loveCommon: '2',
      username: 'test',
    });
  });
});
