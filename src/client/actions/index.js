// import axios from 'axios';

export const FETCH_USERS = 'fetch_users';

// when redux-thunk calls this function (the one with async attached to it), its going to pass in three separate arguments
// first argument is the 'dispatch' function as passed below
// second argument is getState function
// third argument is the customized axios instance which is called 'api' here
export const fetchUsers = () => async (dispatch, getState, api) => {
  // const res = await axios.get('http://react-ssr-api.herokuapp.com/users');
  // after adding/passing custom axios instance to redux-thunk
  // our axios request get modified to this version
  // so now the customized axios instance is going to prepend /users with baseURL /api, i.e, /api/users
  // and our Render server will take this request and send it over on to the API server at react-ssr-api.herokuapp.com
  // this was in case of client side rendered react app

  // in server side rendered react app we have set the baseURL to http://react-ssr-api.herokuapp.com
  // so now the customized axios instance is going to prepend /users, i.e, http://react-ssr-api.herokuapp.com/users
  // and the request is made directly by the Render server to API server

  const res = await api.get('/users');

  dispatch({
    type: FETCH_USERS,
    payload: res
  });
};

export const FETCH_CURRENT_USER = 'fetch_current_user';
export const fetchCurrentUser = () => async (dispatch, getState, api) => {
  const res = await api.get('/current_user');

  dispatch({
    type: FETCH_CURRENT_USER,
    payload: res
  });
};

export const FETCH_ADMINS = 'fetch_admins';
export const fetchAdmins = () => async (dispatch, getState, api) => {
  const res = await api.get('/admins');

  dispatch({
    type: FETCH_ADMINS,
    payload: res
  });
};
