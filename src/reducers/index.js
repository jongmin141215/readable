import { combineReducers } from 'redux';
import { RECEIVE_POSTS, RECEIVE_POST, RECEIVE_COMMENTS, RECEIVE_CATEGORIES, SORT } from '../actions';

function posts(state = [], action) {
  switch (action.type) {
    case RECEIVE_POSTS:
      return action.posts;
    case SORT:
      if (action.order === "desc") {
        return [...state].sort((b,a) => a[action.sortBy] - b[action.sortBy]);
      } else {
        return [...state].sort((a,b) => a[action.sortBy] - b[action.sortBy]);
      }
    default:
      return state;
  }
}
function post(state = {}, action) {
  switch (action.type) {
    case RECEIVE_POST:
      return action.post
    default:
     return state;
  }
}
function comments(state = [], action) {
  switch (action.type) {
    case RECEIVE_COMMENTS:
      return action.comments;
    default:
      return state;
  }
}
function categories(state=[], action) {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      return action.categories
    default:
      return state;
  }
}

export default combineReducers({
  posts,
  post,
  comments,
  categories
});
