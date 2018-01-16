import * as API from '../utils/api';

export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const SELECT_POST = "SELECT_POST";
export const FETCH_POST = "FETCH_POST";


export const fetchPosts = () => dispatch => (
  API.getAllPosts().then(posts => dispatch(receivePosts(posts)))
);

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts
});

export const fetchPostsByCategory = category => dispatch => (
  API.getPostsByCategory(category).then(posts => dispatch(receivePosts(posts)))
);

export const selectPost = (selectedPost) => {
  return {
    type: SELECT_POST,
    selectedPost
  }
}

export const fetchPost = (post) => {
  return {
    type: FETCH_POST,
    post
  }
}
