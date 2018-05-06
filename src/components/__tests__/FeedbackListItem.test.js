import React from 'react';
import { shallow } from 'enzyme';
import FeedbackListItem from '../Feedback/FeedbackListItem';

describe('FeedbackListItem', () => {
  test('renders correctly', () => {
    const data = { title: 'This title' };
    const wrapper = shallow(<FeedbackListItem data={data} />);

    expect(wrapper).toMatchSnapshot();
  });
});
