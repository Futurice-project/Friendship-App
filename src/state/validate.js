import { SubmissionError } from 'redux-form';
import React from 'react';
import { ErrorText } from '../components/Layout/SignupLayout';
import moment from 'moment';
import apiRoot from '../utils/api.config';

export const isUsernameAvailable = async username => {
  let usersWithSameUsername = await fetch(
    `${apiRoot}/users/validate/username?username=${username}`,
  );
  usersWithSameUsername = await usersWithSameUsername.json();
  return usersWithSameUsername.length <= 0;
};

export const isEmailAvailable = async email => {
  let usersWithSameEmail = await fetch(
    `${apiRoot}/users/validate/email?email=${email}`,
  );
  usersWithSameEmail = await usersWithSameEmail.json();
  return usersWithSameEmail.length <= 0;
};

export async function validateUserInformations(values) {
  let err = null;

  if (!values.username) {
    err = {
      ...err,
      username: 'Enter a valid username',
    };
  } else if (!isUsernameAvailable(values.username)) {
    err = {
      ...err,
      username: `That username is already taken : ${values.username}`,
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
  } else if (!await isEmailAvailable(values.email)) {
    err = {
      ...err,
      email: `This email is already used : ${values.email}`,
    };
  }

  if (!values.password) {
    err = {
      ...err,
      password: 'Enter a valid password',
    };
  }

  function checkAge(birthDate) {
    return moment().year() - birthDate >= 18;
  }

  if (!values.birthyear) {
    err = {
      ...err,
      birthyear: 'Enter a valid birth year',
    };
  } else if (!checkAge(values.birthyear)) {
    err = {
      ...err,
      birthyear: 'User should be at least 18',
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
  if (!values.locations || values.locations.length <= 0) {
    throw new SubmissionError({
      locations: 'Select at least a location',
      _error: 'Login failed !',
    });
  }
}

export function validatePersonnalities(values) {
  if (!values.personalities || values.personalities.length <= 0) {
    throw new SubmissionError({
      personalities: 'Something went wrong. Sorry for the inconvenience.',
      _error: 'Login failed !',
    });
  }
}

export function validateLoveAndHate(values) {
  if (
    !values.yeahsAndNaahs ||
    (values.yeahsAndNaahs.yeahs.length <= 0 &&
      values.yeahsAndNaahs.nahs.length <= 0)
  ) {
    throw new SubmissionError({
      personalities: 'Select at least one thing you like and dislike',
      _error: 'Login failed !',
    });
  }
}

export function validateMatching(values) {
  if (!values.description) {
    throw new SubmissionError({
      description: 'Enter a description',
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
        return submittedErrors.password ? submittedErrors.password : null;
      case 'BIRTHYEAR':
        return submittedErrors.birthyear ? submittedErrors.birthyear : null;
      case 'GENDERS':
        return submittedErrors.gender ? submittedErrors.gender : null;
      case 'LOCATIONS':
        return submittedErrors.locations ? submittedErrors.locations : null;
      case 'MATCHING_DESCRIPTION':
        return submittedErrors.description ? submittedErrors.description : null;
      default:
        return null;
    }
  }
}

export const renderErrorMessage = error => {
  return <ErrorText>{error}</ErrorText>;
};
