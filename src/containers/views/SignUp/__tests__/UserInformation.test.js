import UserInformation from '../UserInformation';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import React from 'react';
import { Field } from 'redux-form';

//jest.mock('../../../../components/SignUp/Genders', () => 'Genders');

describe('UserInformation', () => {
  const mockStore = configureMockStore([thunk]);

  const initialState = {
    form: {
      signup: {
        emoji: '',
        image: '',
        enableMatching: false,
        description: '',
      },
    },
  };

  test('renders correctly', () => {
    const store = mockStore(initialState);
    const wrapper = shallow(<UserInformation store={store} />);

    expect(wrapper).toMatchSnapshot();
  });
});
