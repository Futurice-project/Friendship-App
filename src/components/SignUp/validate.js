import { SubmissionError } from 'redux-form';
import React from 'react';
import { ErrorText } from '../Layout/SignupLayout';

export default function validate(values, type) {
  console.log('Validating ...');
  console.log(type);

  let err = null;

  if (!values.username) {
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
    err = {
      ...err,
      email: 'Enter a valid email (ex. foo@bar.com)',
    };
  }

  if (!values.pwd) {
    err = {
      ...err,
      pwd: 'Enter a valid password',
    };
  }

  if (!values.birthDate) {
    err = {
      ...err,
      birthDate: 'Enter a valid birth year',
    };
  }

  if (!values.gender) {
    err = {
      ...err,
      gender: 'Select at least a gender',
    };
  }

  console.log(values.locations);
  if (values.locations <= 0) {
    err = {
      ...err,
      gender: 'Select at least a location',
    };
  }

  if (err) {
    throw new SubmissionError({
      ...err,
      _error: 'Login failed !',
    });
  }
}

export function checkErrorMessage(submittedErrors, type) {
  if (submittedErrors) {
    switch (type) {
      case 'USERNAME':
        return submittedErrors.username ? submittedErrors.username : null;
      case 'EMAIL':
        return submittedErrors.email ? submittedErrors.email : null;
      case 'PASSWORD':
        return submittedErrors.pwd ? submittedErrors.pwd : null;
      default:
        return null;
    }
  }
}

export const renderErrorMessage = error => {
  return <ErrorText>{error}</ErrorText>;
};
