import React from 'react';
import { shallow } from 'enzyme';

import SurveyQuestion from '../Feedback/SurveyQuestion';

describe('SurveyQuestion', () => {
  const subtitle = 'Tell us anything you like!';
  const onChange = jest.fn();

  test('SurveyQuestion renders correctly', () => {
    const wrapper = shallow(<SurveyQuestion />);
    expect(wrapper).toMatchSnapshot();
  });
  test('SurveyQuestion receives props correctly', () => {
    const wrapper = shallow(
      <SurveyQuestion
        title={'Hello'}
        subtitle={subtitle}
        onChange={onChange}
        value={'hi'}
      />,
    );
    const surveyQuestion = wrapper.find('TextInput');
    expect(surveyQuestion.props().placeholder).toEqual(
      'Tell us anything you like!',
    );

    expect(surveyQuestion.props().value).toEqual('hi');

    expect(surveyQuestion.props().onChangeText()).toMatchSnapshot();
  });
});
