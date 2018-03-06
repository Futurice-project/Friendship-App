import { SubmissionError } from 'redux-form';
import React from 'react';
import { ErrorText } from './Layout';

export default function submit(values) {
  let err = null;
  console.log('Validating ...');

  if (!values.username) {
    console.log('Checking username ...');
    err = {
      ...err,
      username: 'Enter a valid username',
    };
  }

  function emailNotValid(email) {
    const emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return !emailRegEx.test(email);
  }

  if (!values.email || emailNotValid(values.email)) {
    console.log('Checking email ...');
    err = {
      ...err,
      email: 'Enter a valid email (ex. foo@bar.com)',
    };
  }

  if (!values.pwd) {
    console.log('Checking password ...');
    err = {
      ...err,
      pwd: 'Enter a valid password',
    };
  }

  if (!values.birthDate) {
    console.log('Checking birth year ...');
    err = {
      ...err,
      birthDate: 'Enter a valid birth year',
    };
  }

  if (!values.gender) {
    console.log('Checking username ...');
    err = {
      ...err,
      gender: 'Select at least a gender',
    };
  }

  if (err) {
    throw new SubmissionError({
      ...err,
      _error: 'Login failed !',
    });
  }
}

export const renderErrorMessage = error => {
  return <ErrorText>{error}</ErrorText>;
};
