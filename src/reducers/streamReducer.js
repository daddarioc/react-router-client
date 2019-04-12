import {
  FETCH_STREAMS,
  FETCH_STREAM,
  CREATE_STREAM,
  DELETE_STREAM,
  EDIT_STREAM
} from '../actions/types';
import _ from 'lodash';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_STREAM:
    case CREATE_STREAM:
    case EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case FETCH_STREAMS:
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    case DELETE_STREAM:
      return _.omit(state, action.payload);
    /* above is equivalent to vanilla js:
        const newState = { ...state };
        delete newState[action.payload];
        return newState;
      */
    default:
      return state;
  }
};
