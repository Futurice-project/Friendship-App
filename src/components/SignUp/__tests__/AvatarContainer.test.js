import { shallow } from 'enzyme';
import React from 'react';
import MoodContainer from '../Avatar';

describe('MoodContainer', () => {
  test('A moodContainer renders correctly', () => {
    const moodContainer = shallow(<MoodContainer />);
    expect(moodContainer).toMatchSnapshot();
  });

  test('Props change the background color', () => {
    const selectedAvatar = shallow(<MoodContainer selected />);
    const optionAvatar = shallow(<MoodContainer />);

    console.log(
      'Props of a selected Avatar : ',
      selectedAvatar.props().children.props.style.backgroundColor,
    );
    console.log(
      'Props of an option Avatar : ',
      optionAvatar.props().children.props.style.backgroundColor,
    );

    expect(selectedAvatar.props().children.props.style.backgroundColor).toBe(
      '#ff8a65',
    );
    expect(optionAvatar.props().children.props.style.backgroundColor).toBe(
      '#ffffff',
    );
  });
});
