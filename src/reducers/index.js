import { combineReducers } from 'redux';
import { RECEIVE_POSTS, SELECT_POST, RECEIVE_POST, RECEIVE_COMMENTS, RECEIVE_CATEGORIES, SORT } from '../actions';

function posts(state = [], action) {
  switch (action.type) {
    case RECEIVE_POSTS:
    console.log("featchPosts called")
    console.log("action.posts", action.posts)
    console.log("new state", [...state, action.posts])
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
function selectedPost(state = {}, action) {
  switch (action.type) {
    case SELECT_POST:
      console.log("new_state", { ...state, selectedPost: action.selectedPost })
      return { ...state, selectedPost: action.selectedPost }
    default:
      return state;
  }
}
function post(state = {}, action) {
  switch (action.type) {
    case RECEIVE_POST:
      console.log("RECEIVE POST", action.post)
      return action.post
    default:
     return state;
  }
}
function comments(state = [], action) {
  switch (action.type) {
    case RECEIVE_COMMENTS:
      console.log("RECEIVE COMMENTS", action.comments)
      return action.comments;
    default:
      return state;
  }
}
function categories(state=[], action) {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      console.log("RECEIVE_CATEGORIES", action.categories)
      return action.categories
    default:
      return state;
  }
}

export default combineReducers({
  posts,
  selectedPost,
  post,
  comments,
  categories
});
