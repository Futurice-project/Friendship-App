import React from 'react';
import 'react-native';
import { shallow } from 'enzyme';

import CheckBoxs from '../Feedback/CheckBoxs';

describe('CheckBoxs', () => {
  test('renders correctly', () => {
    const wrapper = shallow(<CheckBoxs />);
    expect(wrapper).toMatchSnapshot();
  });
  test('onPress change CheckBoxs state', () => {
    const wrapper = shallow(<CheckBoxs />);
    wrapper.find('CheckBox').simulate('press');
    expect(wrapper.state().check).toEqual(true);
    wrapper.find('CheckBox').simulate('press');
    expect(wrapper.state().check).toEqual(false);
  });

  test('receive CheckBox title ', () => {
    const wrapper = shallow(<CheckBoxs title="Title name" />);
    const checkBox = wrapper.find('CheckBox');
    expect(checkBox.props().title).toEqual('Title name');
  });
});
