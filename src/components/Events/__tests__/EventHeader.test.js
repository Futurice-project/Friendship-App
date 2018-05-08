import React from 'react';
import { shallow } from 'enzyme';

import EventsHeader from '../EventsHeader';

describe('Test EventsHeader', () => {
  test('should render properly', () => {
    const wrapper = shallow(
      <EventsHeader headerText="Events" rightText="Selection" />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
