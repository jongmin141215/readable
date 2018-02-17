import * as API from '../utils/api';

export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const RECEIVE_POST = "RECEIVE_POST";
export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";
export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES";
export const VOTE_POST = "VOTE_POST";
export const SORT = "SORT";

export const fetchPosts = (category) => dispatch => {
  if (category) {
    return API.getPostsByCategory(category).then(posts => dispatch(receivePosts(posts)))
  } else {
    return API.getAllPosts().then(posts => dispatch(receivePosts(posts)))
  }
}

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts
});

export const fetchPost = (id) => dispatch => (
  API.getPost(id).then(post => dispatch(receivePost(post)))
);

export const receivePost = post => ({
  type: RECEIVE_POST,
  post
})

export const fetchCategories = () => dispatch => {
  API.getCategories().then(categories => dispatch(receiveCategories(categories)))
}

export const receiveCategories = categories => {
  return {
    type: RECEIVE_CATEGORIES,
    categories
  }
}

export const fetchComments = (postId) => dispatch => (
  API.getComments(postId).then(comments => dispatch(receiveComments(comments)))
)

export const receiveComments = comments => {
  return {
    type: RECEIVE_COMMENTS,
    comments
  }
}

export const vote = (id, vote, match) => dispatch => {
  if (match && match.parentId) {
    return API.voteComment(id, vote).then(() => dispatch(fetchComments(match.parentId)))
  } else {
    return API.votePost(id, vote).then(() => {
     if (match) {
        dispatch(fetchPosts(match.params.category));
      } else {
        dispatch(fetchPosts())
      }
      dispatch(fetchPost(id))
    })
  }
}

export const sort = (sortBy, order) => {
  return {
    type: SORT,
    sortBy,
    order
  }
}
