import { combineReducers } from 'redux';
import { RECEIVE_POSTS, SELECT_POST, RECEIVE_POST, RECEIVE_COMMENTS } from '../actions';

function posts(state = [], action) {
  switch (action.type) {
    case RECEIVE_POSTS:
    console.log("featchPosts called")
    console.log("action.posts", action.posts)
    console.log("new state", [...state, action.posts])
      return action.posts;
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

export default combineReducers({
  posts,
  selectedPost,
  post,
  comments
});
