import { SubmissionError } from 'redux-form';
import React from 'react';
import { ErrorText } from '../Layout/SignupLayout';

export function validateUserInformations(values) {
  console.log('Validating User informations ...');

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

  if (err) {
    throw new SubmissionError({
      ...err,
      _error: 'Login failed !',
    });
  }
}

export function validateLocations(values) {
  console.log('Validating locations ...');
  if (!values.locations || values.locations.length <= 0) {
    throw new SubmissionError({
      locations: 'Select at least a location',
      _error: 'Login failed !',
    });
  }
}

export function validatePersonnalities(values) {
  console.log('Validating personalities');
  if (!values.personalities || values.personalities.length <= 0) {
    throw new SubmissionError({
      personalities: 'Something went wrong. Sorry for the inconvenience.',
      _error: 'Login failed !',
    });
  }
}

export function validateLoveAndHate(values) {
  console.log('Validating Love and Hate');
  if (
    !values.yeahs ||
    values.yeahs.length <= 0 ||
    !values.nahs ||
    values.nahs.length <= 0
  ) {
    throw new SubmissionError({
      personalities: 'Select at least one thing you like and dislike',
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
      case 'LOCATIONS':
        return submittedErrors.locations ? submittedErrors.locations : null;
      default:
        return null;
    }
  }
}

export const renderErrorMessage = error => {
  return <ErrorText>{error}</ErrorText>;
};
