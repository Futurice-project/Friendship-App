import React from 'react';
import 'react-native';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ShallowRenderer from 'react-test-renderer/shallow';

import { EventsView } from '../EventsView';
import EventsViewConnect from '../EventsView';
import EventList from '../../../components/Events/EventsList';

describe('EventsView', () => {
  const mockStore = configureMockStore([thunk]);

  const initialState = {
    auth: {
      data: {
        decoded: {
          id: 1,
        },
      },
    },
    events: {
      loading: false,
      data: [
        {
          id: 2,
          createdAt: '2018-04-21T21:00:00.000Z',
          hostId: 4,
          title: 'cupiditate',
          eventImage: null,
          description:
            'Ut laborum optio ad mollitia esse nemo est quia. Quibusdam quia aliquam qui dignissimos praesentium. Tempora sint nulla sit.',
          city: 'Akeemville',
          address: '3164 Labadie Meadows',
          minParticipants: null,
          maxParticipants: null,
          participantsMix: '60',
          eventDate: '2018-05-06T21:00:00.000Z',
          numberParticipantsIndex: 8,
          commonNaahYeahsForUserIndex: 8,
          locationSortIndex: 8,
          dateIndex: 8,
          userIsJoining: false,
          reccomendationIndex: 80,
          durationValue: 0,
          compatibilityScore: '78',
        },
        {
          id: 1,
          createdAt: '2018-04-22T21:00:00.000Z',
          hostId: 5,
          title: 'Birthday Party',
          eventImage: null,
          description:
            'Ut laborum optio ad mollitia esse nemo est quia. Quibusdam quia aliquam qui dignissimos praesentium. Tempora sint nulla sit.',
          city: 'Helsinki',
          address: '3164 Labadie Meadows',
          minParticipants: null,
          maxParticipants: null,
          participantsMix: '60',
          eventDate: '2018-05-10T21:00:00.000Z',
          numberParticipantsIndex: 4,
          commonNaahYeahsForUserIndex: 7,
          locationSortIndex: 9,
          dateIndex: 11,
          userIsJoining: true,
          reccomendationIndex: 70,
          durationValue: 0,
          compatibilityScore: '80',
        },
        {
          id: 3,
          createdAt: '2018-04-23T21:00:00.000Z',
          hostId: 5,
          title: 'Celebration',
          eventImage: null,
          description:
            'Ut laborum optio ad mollitia esse nemo est quia. Quibusdam quia aliquam qui dignissimos praesentium. Tempora sint nulla sit.',
          city: 'Akeemville',
          address: '3164 Labadie Meadows',
          minParticipants: null,
          maxParticipants: null,
          participantsMix: '60',
          eventDate: '2018-05-08T21:00:00.000Z',
          numberParticipantsIndex: 5,
          commonNaahYeahsForUserIndex: 9,
          locationSortIndex: 3,
          dateIndex: 10,
          userIsJoining: true,
          reccomendationIndex: 60,
          durationValue: 0,
          compatibilityScore: '85',
        },
      ],
    },
    eventParticipantsNum: {
      loading: false,
      data: {
        data: [
          {
            eventId: 1,
            avatar:
              'https://friendship-app.s3.amazonaws.com/avatars/avatar1.png',
          },
          {
            eventId: 2,
            avatar:
              'https://friendship-app.s3.amazonaws.com/avatars/avatar1.png',
          },
          {
            eventId: 2,
            avatar:
              'https://friendship-app.s3.amazonaws.com/avatars/avatar1.png',
          },
          {
            eventId: 3,
            avatar:
              'https://friendship-app.s3.amazonaws.com/avatars/avatar1.png',
          },
        ],
      },
    },
  };
  const store = mockStore(initialState);
  const wrapper = shallow(<EventsViewConnect store={store} />);
  test('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('EventsViewRendering when it is sorted by time', () => {
    const fetchEvents = userId => {
      return initialState.events.data;
    };
    const fetchEventParticipantsNum = () => {
      return initialState.eventParticipantsNum;
    };
    const container = shallow(
      <EventsView
        {...initialState}
        fetchEvents={fetchEvents}
        fetchEventParticipantsNum={fetchEventParticipantsNum}
      />,
    );
    container.setState({ sorting: 'By time' });
    // console.log ('Show here', container.props ().children[1].props.events);
    const orderedEventsByTime = [
      {
        id: 1,
        createdAt: '2018-04-22T21:00:00.000Z',
        hostId: 5,
        title: 'Birthday Party',
        eventImage: null,
        description:
          'Ut laborum optio ad mollitia esse nemo est quia. Quibusdam quia aliquam qui dignissimos praesentium. Tempora sint nulla sit.',
        city: 'Helsinki',
        address: '3164 Labadie Meadows',
        minParticipants: null,
        maxParticipants: null,
        participantsMix: '60',
        eventDate: '2018-05-10T21:00:00.000Z',
        numberParticipantsIndex: 4,
        commonNaahYeahsForUserIndex: 7,
        locationSortIndex: 9,
        dateIndex: 11,
        userIsJoining: true,
        reccomendationIndex: 70,
        durationValue: 0,
        compatibilityScore: '80',
      },
      {
        id: 3,
        createdAt: '2018-04-23T21:00:00.000Z',
        hostId: 5,
        title: 'Celebration',
        eventImage: null,
        description:
          'Ut laborum optio ad mollitia esse nemo est quia. Quibusdam quia aliquam qui dignissimos praesentium. Tempora sint nulla sit.',
        city: 'Akeemville',
        address: '3164 Labadie Meadows',
        minParticipants: null,
        maxParticipants: null,
        participantsMix: '60',
        eventDate: '2018-05-08T21:00:00.000Z',
        numberParticipantsIndex: 5,
        commonNaahYeahsForUserIndex: 9,
        locationSortIndex: 3,
        dateIndex: 10,
        userIsJoining: true,
        reccomendationIndex: 60,
        durationValue: 0,
        compatibilityScore: '85',
      },
      {
        id: 2,
        createdAt: '2018-04-21T21:00:00.000Z',
        hostId: 4,
        title: 'cupiditate',
        eventImage: null,
        description:
          'Ut laborum optio ad mollitia esse nemo est quia. Quibusdam quia aliquam qui dignissimos praesentium. Tempora sint nulla sit.',
        city: 'Akeemville',
        address: '3164 Labadie Meadows',
        minParticipants: null,
        maxParticipants: null,
        participantsMix: '60',
        eventDate: '2018-05-06T21:00:00.000Z',
        numberParticipantsIndex: 8,
        commonNaahYeahsForUserIndex: 8,
        locationSortIndex: 8,
        dateIndex: 8,
        userIsJoining: false,
        reccomendationIndex: 80,
        durationValue: 0,
        compatibilityScore: '78',
      },
    ];
    expect(container.props().children[1].props.events).toEqual(
      orderedEventsByTime,
    );
  });
});
