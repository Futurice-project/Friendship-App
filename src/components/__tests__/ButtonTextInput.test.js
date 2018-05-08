import React from 'react';
import { shallow } from 'enzyme';

import { Bubble, Title } from '../BubbleTextInput';
import DescriptionBubble from '../BubbleTextInput';

describe('Bubble', () => {
  test('bubble render correctly', () => {
    const bubbleSnapshot = shallow(<Bubble />);
    expect(bubbleSnapshot).toMatchSnapshot();
  });

  test('styles render correctly', () => {
    const bubble = shallow(<Bubble />);

    // console.log('bubble styles: ', bubble.props().style[0]);

    expect(bubble.props().style[0].backgroundColor).toBe('#fff');
    expect(bubble.props().style[0].width).toBe(320);
    expect(bubble.props().style[0].overflow).toBe('hidden');
  });
});

describe('Tittle', () => {
  test('tittle render correctly', () => {
    const titleSnapshot = shallow(<Title />);
    expect(titleSnapshot).toMatchSnapshot();
  });

  test('styles render correctly', () => {
    const title = shallow(<Title />);

    // console.log('title styles: ', title.props().style[0]);

    expect(title.props().style[0].width).toBe('100%');
    expect(title.props().style[0].textAlign).toBe('left');
  });
});
