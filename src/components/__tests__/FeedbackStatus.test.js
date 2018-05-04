import React from 'react';
import { shallow } from 'enzyme';

import FeedbackStatus from '../Feedback/FeedbackStatus';

describe('FeedbackStatus', () => {
  const data = {
    title: 'Test title',
    subtitle: 'Test subtitle',
  };

  test('feeback status renders correctly', () => {
    const snapshot = shallow(<FeedbackStatus data={data} />);
    expect(snapshot).toMatchSnapshot();
  });

  test('feeback status receive props correctly', () => {
    const feedbackStatus = shallow(<FeedbackStatus data={data} />);
    expect(feedbackStatus).toMatchSnapshot();
    expect(
      feedbackStatus.props().children[1].props.children[0].props.children,
    ).toEqual('Test title');
    expect(
      feedbackStatus.props().children[1].props.children[1].props.children,
    ).toEqual('Test subtitle');
  });
});
