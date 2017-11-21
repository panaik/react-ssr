import { FETCH_CURRENT_USER } from '../actions';

// initial state is set to 'null', which indicates we do not know whether or not the user is authenticated
export default function(state = null, action) {
  switch (action.type) {
    case FETCH_CURRENT_USER:
      return action.payload.data || false;
    // if user is not authenticated then the API returns payload.data is not defined,
    // in which case we want to return 'false' to the app

    default:
      return state;
  }
}
