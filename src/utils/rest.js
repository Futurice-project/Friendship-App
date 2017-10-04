import reduxApi, { transformers } from 'redux-api';
import adapterFetch from 'redux-api/lib/adapters/fetch';
import jwtDecode from 'jwt-decode';

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
  users: {
    url: `${apiRoot}/users`,
    // transformer: transformers.array,
    crud: true,
  },
  usersByPage: {
    url: `${apiRoot}/users/page/:page`,
    // transformer: transformers.array,
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
  userTag: {
    url: `${apiRoot}/user_tag/:userId`,
    transformer: transformers.array,
    crud: true,
  },

  // Add more API endpoints here! Examples below:

  /*
  // Endpoints which return an array (data defaults to [])
  teams: {
    url: `${apiRoot}/teams`,
    transformer: transformers.array,
    crud: true,
  },
  companies: {
    url: `${apiRoot}/companies`,
    transformer: transformers.array,
    crud: true,
  }
  // Endpoint which returns an object (data defaults to {})
  profile: {
    url: `${apiRoot}/profile`,
    crud: true,
  }
  */

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
      console.log('Error', err);
    }
    if (data) {
      return data;
      console.log('Success', data);
    }
    throw err;
    // if (err) {
    //   let msg = 'Error';

    //   // error code
    //   msg += err.statusCode ? ` ${err.statusCode}` : '';

    //   // error reason
    //   msg += err.error ? ` ${err.error}` : '';

    //   // error description
    //   msg += err.message ? `: ${err.message}` : '';
    //   store.dispatch(
    //     showError({
    //       msg,
    //       details: JSON.stringify(err, Object.getOwnPropertyNames(err), 4),
    //     }),
    //   );

    //   throw err;
    // }
  });

export default rest;
export const reducers = rest.reducers;
