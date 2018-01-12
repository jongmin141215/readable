import { combineReducers } from 'redux';
import { FETCH_POSTS, SELECT_POST } from '../actions';

function posts(state = [], action) {
  switch (action.type) {
    case FETCH_POSTS:
      return [...state, action.posts];
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

export default combineReducers({
  posts,
  selectedPost
});
