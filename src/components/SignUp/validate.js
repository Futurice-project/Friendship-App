import { SubmissionError } from 'redux-form';

function submit(values) {
  console.log('Hello Submit ...');
  console.log(values);
  /*const err = '';
  if (!values.username) {
    throw new SubmissionError({
      username: 'Please, enter a valid username',
      _error: 'Login failed!'
    })
  } else {
    window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
  }*/
}

export default submit;
