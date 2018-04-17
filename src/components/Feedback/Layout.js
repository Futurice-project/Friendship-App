import React from 'react';
import { Platform } from 'react-native';

const customWidth = Platform.OS === 'ios' ? 320 : 300;

const Styles = {
  title: {
    fontFamily: 'NunitoSans-Bold',
    fontSize: 15,
    color: '#4a4a4a',
  },
  feedbackInput: {
    height: 150,
    backgroundColor: '#e8e9e8',
    borderRadius: 33,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 4,
    paddingRight: 40,
    paddingLeft: 30,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 14,
    lineHeight: 18,
    fontFamily: 'NunitoSans-Regular',
    textAlignVertical: 'top',
  },
  interestInput: {
    height: 50,
    width: customWidth,
    backgroundColor: '#e8e9e8',
    borderRadius: 33,
    paddingTop: 20,
    fontSize: 14,
    color: '#2d4359',
    letterSpacing: 1.47,
    fontFamily: 'NunitoSans-LightItalic',
    textAlignVertical: 'top',
  },
  text: {
    color: '#949795',
    fontFamily: 'NunitoSans-Regular',
    fontSize: 13,
  },
  surveyTitle: {
    marginLeft: 10,
    color: '#4a4a4a',
    fontSize: 12,
    marginBottom: 10,
    fontFamily: 'NunitoSans-Bold',
  },
  surveyText: {
    fontFamily: 'NunitoSans-Light',
    fontSize: 13,
    color: '#2d4359',
  },
};

export default Styles;
