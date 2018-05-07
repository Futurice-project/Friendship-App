import React from 'react';
import { shallow } from 'enzyme';

import SurveyQuestion from '../Feedback/SurveyQuestion';

describe('SurveyQuestion', () => {
  const subtitle = 'Tell us anything you like!'; //String
  const onChange = 'Question category'; //Function
  const value = 'Change how?'; //String

  test('SurveyQuestion renders correctly', () => {
    const wrapper = shallow(<SurveyQuestion />);
    expect(wrapper).toMatchSnapshot();
  });
  test('SurveyQuestion receives props correctly', () => {
    const surveyQuestion = shallow(
      <SurveyQuestion subtitle={subtitle} onChange={onChange} value={value} />,
    );
    expect(surveyQuestion).toMatchSnapshot();
    expect(surveyQuestion.find('Text').first().value).toEqual(
      'Tell us anything you like!',
    );
    expect(
      surveyQuestion
        .find('Input')
        .first()
        .props().children,
    ).toEqual('Change how?');
  });
});
