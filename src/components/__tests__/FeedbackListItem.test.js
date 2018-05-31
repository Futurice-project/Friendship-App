import React from 'react';
import { shallow } from 'enzyme';
import FeedbackListItem from '../Feedback/FeedbackListItem';

describe('FeedbackListItem', () => {
  const data = {
    title: 'This title',
  };

  test('renders correctly', () => {
    const wrapper = shallow(<FeedbackListItem data={data} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('feedbacklistitem recieve props correctly', () => {
    const feedbackListitem = shallow(<FeedbackListItem data={data} />);
    expect(feedbackListitem).toMatchSnapshot();
    expect(
      feedbackListitem
        .find('Text')
        .first()
        .props().children,
    ).toEqual('This title');
  });
});
