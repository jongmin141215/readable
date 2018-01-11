import { combineReducers } from 'redux';
import { FETCH_POSTS } from '../actions';

function posts(state = [], action) {
  switch (action.type) {
    case FETCH_POSTS:
      return [...state, action.posts];
    default:
      return state;
  }
}

export default combineReducers({
  posts
});
