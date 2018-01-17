import * as API from '../utils/api';

export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const SELECT_POST = "SELECT_POST";
export const RECEIVE_POST = "RECEIVE_POST";
export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";



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

export const fetchPost = (id) => dispatch => (
  API.getPost(id).then(post => dispatch(receivePost(post)))
);

export const receivePost = post => ({
  type: RECEIVE_POST,
  post
})

export const fetchComments = (postId) => dispatch => (
  API.getComments(postId).then(comments => dispatch(receiveComments(comments)))
)

export const receiveComments = comments => {
  return {
    type: RECEIVE_COMMENTS,
    comments
  }
}
