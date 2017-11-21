import { FETCH_USERS } from '../actions';

// list of users is contained in an array, hence setting initial state to []
export default (state = [], action) => {
  switch (action.type) {
    case FETCH_USERS:
      return action.payload.data;

    default:
      return state;
  }
};
