import Avatar from '../Avatar';
import { shallow } from 'enzyme';
import React from 'react';

describe('Avatar', () => {
  test('An avatar option renders correctly', () => {
    const avatar = shallow(<Avatar />);
    expect(avatar).toMatchSnapshot();
  });
});
