import reduxApi, { transformers } from 'redux-api';
import adapterFetch from 'redux-api/lib/adapters/fetch';
import jwtDecode from 'jwt-decode';
import { errorFetch } from '../state/error';
import { NavigationActions } from 'react-navigation';

// import { showError } from '../modules/ErrorSnackbar';

let store;

export const injectStore = _store => {
  store = _store;
};

/*
// Endpoint configurations
These example endpoints can be called by dispatching the respective actions, e.g:
dispatch(rest.actions.teams.post({teamId: 42}, { body: JSON.stringify(exampleData) }));
Results in: POST /teams?teamId=42 with POST data from 'exampleData'
Result of request can be found in: `state.teams.data`
Information about request: `state.teams.error`, `state.teams.sync`, `state.teams.error`...
*/

let apiRoot;

if (process.env.NODE_ENV === 'development') {
  apiRoot = 'http://localhost:3888';
} else {
  apiRoot = 'https://my-app.herokuapp.com';
}

const rest = reduxApi({
  personalities: {
    url: `${apiRoot}/personalities`,
    crud: true,
  },
  users: {
    url: `${apiRoot}/users`,
    crud: true,
  },
  usersSearch: {
    url: `${apiRoot}/users/search/:username`,
    transformer: transformers.array,
    crud: true,
  },
  userDetails: {
    url: `${apiRoot}/users/:userId`,
    crud: true,
  },
  tagsForUser: {
    url: `${apiRoot}/tagsForUser/:userId`,
    transformer: transformers.array,
    crud: true,
  },

  auth: {
    url: `${apiRoot}/users/authenticate`,
    transformer: (data = {}) => {
      if (data.token) {
        return {
          ...data,
          decoded: jwtDecode(data.token),
        };
      }
      return data;
    },
    options: {
      method: 'POST',
    },
    postfetch: [
      function({ data, actions, dispatch, getState, request }) {
        dispatch(
          NavigationActions.navigate({
            routeName: 'Tabs',
          }),
        );
      },
    ],
  },
})
  .use('options', (url, params, getState) => {
    const { auth: { data: { token } } } = getState();

    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    // Add token to request headers
    if (token) {
      return { headers: { ...headers, Authorization: `Bearer ${token}` } };
    }

    return { headers };
  })
  .use('fetch', adapterFetch(fetch))
  .use('responseHandler', (err, data) => {
    if (err) {
      console.log(store);
      store.dispatch(errorFetch(err.message));
      console.log('Error', err);
    }
    if (data) {
      // console.log('Success', data);
      return data;
    }
    throw err;
  });

export default rest;
export const reducers = rest.reducers;
