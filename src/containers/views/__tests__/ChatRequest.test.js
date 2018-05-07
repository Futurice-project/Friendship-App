import React from 'react';
import 'react-native';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import ChatRequest from '../Chat/ChatRequest';

describe('ChatRequest'),
  () => {
    const mockStore = configureMockStore([thunk]);
    state = { text: '' };

    const initialState = {
      auth: {
        data: {
          decoded: {
            id: 1,
          },
        },
      },
      currentUserId: 152,
      navigation: {
        state: {
          key: {
            params: {
              route: 'People',
              user: {
                active: true,
                birthyear: 1980,
                createdAt: '2018-03-27T21:00:00.000Z',
                description:
                  'Iure vel architecto fugit dolorum explicabo totam consequatur. Aut quia quidem unde voluptatem ipsa cum. Deserunt natus distinctio deleniti facere. Cupiditate omnis distinctio reiciendis nesciunt et. Quae quos praesentium velit. Vel dolores quos quae repudiandae odio.',
                email: 'Ethelyn@hotmail.com',
                emoji: '👻',
                genderlist: ['Human', 'WOMAN'],
                hateCommon: '1',
                id: 4,
                image: null,
                isbanned: 0,
                lastActive: '2018-03-14T22:00:00.000Z',
                locations: ['Helsinki'],
                loveCommon: 1,
                status: 'Activated',
                username: 'Bailee_Rauf61',
              },
            },
            routeName: 'ChatRequest',
          },
        },
      },
    };

    test('renders correctly', () => {
      const store = mockStore(initialState);
      const wrapper = shallow(<ChatRequest store={store} />);

      expect(wrapper).toMatchSnapshot();
    });
  };
