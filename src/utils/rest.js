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
  apiRoot = 'https://friendshipapp-backend.herokuapp.com';
}

authTransformer = (data = {}) => {
  if (data.token) {
    return {
      ...data,
      decoded: jwtDecode(data.token),
    };
  }
  return data;
};

const rest = reduxApi({
  activities: {
    url: `${apiRoot}/tags`,
    crud: true,
  },
  personalities: {
    url: `${apiRoot}/personalities`,
    crud: true,
  },
  locations: {
    url: `${apiRoot}/locations`,
    crud: true,
  },
  usersByPage: {
    url: `${apiRoot}/users/page/:number`,
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
  personalitiesForUser: {
    url: `${apiRoot}/user_personality/:userId`,
    transformer: transformers.array,
    crud: true,
  },
  currentUser: {
    url: `${apiRoot}/users/:userId`,
    crud: true,
  },
  tagsForCurrentUser: {
    url: `${apiRoot}/tagsForUser/:userId`,
    transformer: transformers.array,
    crud: true,
  },
  personalitiesForCurrentUser: {
    url: `${apiRoot}/user_personality/:userId`,
    transformer: transformers.array,
    crud: true,
  },
  userlistForTag: {
    url: `${apiRoot}/tag_user/tag/:tagId`,
    transformer: transformers.array,
    crud: true,
  },
  chatRooms: {
    url: `${apiRoot}/chatrooms`,
    crud: true,
  },
  createChatRoom: {
    url: `${apiRoot}/chatrooms`,
    crud: true,
    options: {
      method: 'POST',
    },
  },
  chatRoomsWithUserId: {
    url: `${apiRoot}/chatrooms/userid/:id`,
    crud: true,
  },
  chatRoomMessages: {
    url: `${apiRoot}/chatrooms/:id`,
    crud: true,
  },
  sendMessage: {
    url: `${apiRoot}/chatrooms/:id`,
    crud: true,
    options: {
      method: 'POST',
    },
    postfetch: [
      function({ dispatch, actions, data }) {
        const id = data.chatroom_id;
        dispatch(actions.chatRoomMessages({ id }));
      },
    ],
  },
  createUserPersonality: {
    url: `${apiRoot}/user_personality`,
    options: { method: 'POST' },
  },
  createUserPersonalities: {
    url: `${apiRoot}/user_personalities`,
    options: { method: 'POST' },
  },
  register: {
    url: `${apiRoot}/users`,
    transformer: authTransformer,
    reducerName: 'auth',
    options: { method: 'POST' },
  },
  auth: {
    url: `${apiRoot}/users/authenticate`,
    transformer: authTransformer,
    options: {
      method: 'POST',
    },
  },
  createUserLocations: {
    url: `${apiRoot}/user_locations`,
    options: { method: 'POST' },
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
      throw err;
    }
  });

export default rest;
export const reducers = rest.reducers;
