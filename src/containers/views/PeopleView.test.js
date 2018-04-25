import React from 'react';
import 'react-native';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import PeopleView from './PeopleView';

describe('PeopleView', () => {
  const mockStore = configureMockStore([thunk]);

  const users = [
    {
      id: 2,
      email: 'test@test.com',
      username: 'justATest',
      emoji: '��🇭',
      birthyear: 1980,
      genderlist: ['HUMAN'],
      loveCommon: 2,
      hateCommon: 1,
      locations: ['Istanbul'],
    },
    {
      id: 3,
      email: 'test@test.com',
      username: 'justATest',
      emoji: '��🇭',
      birthyear: 1980,
      genderlist: ['HUMAN'],
      loveCommon: 2,
      hateCommon: 1,
      locations: ['Istanbul'],
    },
  ];

  const initialState = {
    usersByPage: {
      data: {
        data: users,
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
    const store = mockStore(initialState);
    const wrapper = shallow(<PeopleView store={store} />);

    expect(wrapper).toMatchSnapshot();
  });
});
