import React from 'react';
import { shallow } from 'enzyme';

import { ButtonWrapper } from '../Button';

describe('ButtonWrapper', () => {
  test('renders correctly', () => {
    const wrapper = shallow(<ButtonWrapper />);

    expect(wrapper).toMatchSnapshot();
  });

  test('props change the design correctly', () => {
    // we use shallow rendering to test our components
    // http://airbnb.io/enzyme/docs/api/shallow.html
    const button = shallow(<ButtonWrapper />);
    const buttonBorder = shallow(<ButtonWrapper border />);
    const buttonPrimary = shallow(<ButtonWrapper primary />);
    const buttonPrimaryLight = shallow(<ButtonWrapper primary color="light" />);

    // see: http://airbnb.io/enzyme/docs/api/ShallowWrapper/debug.html
    // console.log(button.debug());
    // console.log(buttonPrimary.debug());

    // you can see in the console that the backgroundColor is different for each of them
    // console.log('button props:', button.props());
    // console.log('buttonPrimary props:', buttonPrimary.props());
    // console.log('buttonPrimaryLight props', buttonPrimaryLight.props());
    // console.log('buttonBorder props', buttonBorder.props());

    // console.log('button state: ', button.state());
    // console.log('buttonPrimary state:', buttonPrimary.state());
    // console.log('buttonPrimaryLight state:', buttonPrimaryLight.state());

    // console.log(button.props().style[0].backgroundColor);
    // console.log(buttonPrimary.props().style[0].backgroundColor);
    // console.log(buttonPrimaryLight.props().style[0].backgroundColor);

    expect(button.props().style[0].backgroundColor).toBe(undefined);
    expect(buttonPrimary.props().style[0].backgroundColor).toBe(
      'rgba(94, 104, 109, 1)',
    );
    expect(buttonPrimaryLight.props().style[0].backgroundColor).toBe(
      'rgba(255, 255, 255, 1)',
    );

    expect(buttonBorder.props().style[0].borderWidth).toBe(2);
  });
});
