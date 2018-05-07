import React from 'react';
import { shallow } from 'enzyme';

import SurveyQuestion from '../Feedback/SurveyQuestion';

describe('SurveyQuestion', () => {
  const subtitle = 'Tell us anything you like!';
  const onChange = () => {
    findFriendEasy => this.setState({ findFriendEasy });
  };
  const value = 'Change how?';
  const data = {
    subtitle: 'Tell us anything you like!',
    onChange: findFriendEasy => this.setState({ findFriendEasy }),
    value: 'Change how?',
  };

  test('SurveyQuestion renders correctly', () => {
    const wrapper = shallow(<SurveyQuestion />);
    expect(wrapper).toMatchSnapshot();
  });
  test('SurveyQuestion receives props correctly', () => {
    const surveyQuestion = shallow(<SurveyQuestion data={data} />);
    //subtitle={subtitle} onChange={onChange} value={value
    const surveySubtitle = shallow(<SurveyQuestion subtitle={subtitle} />);
    const surveyValue = shallow(<SurveyQuestion value={value} />);
    console.log(surveyQuestion.instance());
    expect(surveyQuestion.instance().props.data.subtitle).toEqual(
      'Tell us anything you like!',
    );
    expect(surveyQuestion.instance().props.data.value).toEqual('Change how?');

    /* onChange={onChange} value={value}*/
  });
});
