import React from 'react';
import { shallow } from 'enzyme';

import EventsList from '../EventsList';

describe('render', () => {
  test('renders correctly', () => {
    const props = {
      events: {
        data: [
          {
            title: 'Test title',
            description: 'Test description',
            city: 'Test city',
            address: 'Test address',
            eventDate: 'Test date',
            id: 5,
          },
        ],
      },
    };

    const wrapper = shallow(<EventsList {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('flatlist uses props to render items', () => {
    const props = {
      events: {
        data: [
          {
            title: 'Test title',
            description: 'Test description',
            city: 'Test city',
            address: 'Test address',
            eventDate: 'Test date',
            id: 5,
          },
        ],
      },
      eventParticipantsNum: {
        data: {
          data: [],
        },
      },
    };

    const wrapper = shallow(<EventsList {...props} />);

    const itemProps = wrapper
      .find('FlatList')
      .props()
      .renderItem({ item: props.events.data[0] }).props;

    expect(wrapper.find('FlatList').props().data.data.length).toBe(1);
    expect(itemProps).toEqual({
      title: 'Test title',
      description: 'Test description',
      city: 'Test city',
      address: 'Test address',
      date: 'Test date',
      id: 5,
      srcImage: undefined,
      emojis: [],
    });
  });
});
