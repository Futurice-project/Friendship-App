import React from 'react';
import { shallow } from 'enzyme';
import FeedbackHeader from '../Feedback/FeedbackHeader';

describe('FeedbackHeader', () => {
  test('renders correctly', () => {
    const wrapper = shallow(<FeedbackHeader />);
    expect(wrapper).toMatchSnapshot();
  });
});
